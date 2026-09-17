import { Schema , model } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlength:20
    },
    phoneno:{
        type:Number,
        required:true
    
    },
    username: {
        type:String,
        required:true,
        maxlength:8
    }
})

const userModel = model("Userdata",userSchema);
export default userModel;