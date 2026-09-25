import { Schema , model } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlength:20
    },
    duration:{
        type:Number,
        required:true
    },
    work: {
        type:String,
        required:true,
        maxlength:50
    }
})

const taskModel = model("taskdata",userSchema);
export default taskModel;