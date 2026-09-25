import mongoose from "mongoose";
const connectdb = async()=>{
    try{
    const conn = await mongoose.connect("mongodb://localhost:27017/school");
    console.log(`DB CONNECTED:${conn.connection.host}`);
    }
    catch(error){
      process.exit(1);
    }
    
}
export default connectdb;