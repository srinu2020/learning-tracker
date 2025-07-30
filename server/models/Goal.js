import mongoose from "mongoose";
const goalSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },title:{
        type:String,
        required:true
    },
    progress:{
        type:Number,
        default:0,
        min:0,
        max:100
    },
    deadline:{
        type:Date,
        required:true
    }
},{timestamps:true})

const Goal=mongoose.model('Goal',goalSchema)
export default Goal