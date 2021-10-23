import express from 'express';
import mongoose from 'mongoose';
import Stud_detail from './models/details.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(dotenv.parse);
//const connectDB = async () => {
  // try {
        //await
         mongoose.connect(process.env.DB_URI, {
            Name: process.env.DB_NAME,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS
        })
        .then((result)=>{
        console.log("DB connected successfuly")
     })
     .catch((error)=>{ 
         console.error(error)
})

//connectDB();

//API to insert data into the Stud_detail DB
app.post('/details', async (req, res) => {
    try {
        const detail = await new Stud_detail(req.body);
        await detail.save();
        res.send(detail);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }

})

//API to fetch data from DB based on its id
app.get('/details/:id', async (req, res) => {
    try {
        const id = req.params.id;
       // console.log(id);
        if (!id) {
            //400<500
            //Bad request
            res.status(400).send("Please send the id");
        }
        const detail = await Stud_detail.findById(id)
        res.send(detail); 
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }

})

//API to fetch whole data from DB
app.get('/details', async (req, res) => {

    try {
     const detail = await Stud_detail.find({});
        res.send(detail); 
        //console.log(detail);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);


    }
})

//API to update data from database based on id
app.put('/details/:id', async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);
         if (!id) {
             //400<500
             //Bad request
             res.status(400).send("Please send the id");
         }
        const detail = await Stud_detail.findByIdAndUpdate({ _id:id },
            {
                $set: {
                    Stud_name: req.body.Stud_name,
                    StudClass: req.body.StudClass,
                    Age: req.body.Age,
                    adharNo: req.body.AadharNo,
                    Email: req.body.Email
                }
            })
        res.send(detail)
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})
//API to delete data from DB based on id
app.delete('/details/:id', async (req, res) => {

    try {
        const id = req.params.id;
    
        if (!id) {
            //400<500
            //Bad request
            res.status(400).send("Please send the id");
        }
           const detail = await Stud_detail.findByIdAndDelete(id);
        res.send(detail);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})


const port = process.env.PORT || 3000
const host = process.env.DB_HOST

app.listen(port, host, () => {
    console.log(`starting server at ${host}: ${port}`);
});