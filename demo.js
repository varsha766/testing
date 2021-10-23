import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"
import Stud_detail from "./models/details.js"
dotenv.config()
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectDB = async () => {
    try {
        mongoose.connect(process.env.DB_URI, {
            dB_Name: process.env.DB_NAME,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS
        })
        console.log("DB connected successfuly")
    } catch (error) {
        console.error(error);
    }
}


app.get('/details/:id', async (req, res) => {

    try {

        const detail = await Stud_detail.findById(req.params.id)
        res.send(detail);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);


    }
})




const host= process.env.DB_HOST;
const port=process.env.PORT

app.listen(host, port, ()=>{
    console.log(`listening at ${host}: ${port}`);
})


