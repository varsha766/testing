import mongoose from 'mongoose';
const Schema= mongoose.Schema
const StudentSchema= new Schema({
    StudName:{
        type: String,
        required: true,

    },
    StudClass:{
        type: Number,
        required: true,

    },
    Age:{
        type: Number,
        required: true,

    },
    AadharNo:{
        type: Number,
        required: true,

    },
    Email:{
        type: String,
        required: true,

    },

})
const Stud_detail= new mongoose.model('Stud_detail', StudentSchema)
export default Stud_detail;