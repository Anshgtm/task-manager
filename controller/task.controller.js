import taskModel from "../model/task.model.js"
export const taskpost = async (req,res)=>{
    try{
    const {name,duration,work}  = req.body;
    const newtask = new taskModel({name,duration,work});
    await newtask.save();
    
    res.status(201).json({
        message:true,
        data:newtask
    })
    }
    catch(error){
        res.status(401).send(`message:${error.message}`);
}}
export const getpost = async(req,res)=>{
    const task = await taskModel.find()
    try{
        res.status(200).json({
        success:true,
        data:task,
        message:"User gets successfully"
    })
    }
    catch (error) {
    console.log(error)
    res.status(500).json({
        success:false,
        message:error.message
    })
}

    
}
export const updatepost = async (req,res)=>{
    const {id} = req.params;
    const {name,duration,work} = req.body;
    const updatedtask = await taskModel.findByIdAndUpdate(id,{name,duration,work},{new:true});
    try{
        res.status(200).json({
           message:true,
              data:updatedtask
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const deletepost = async (req,res)=>{
    const {id} = req.params;

    try{
        const deletedtask = await taskModel.findByIdAndDelete(id);
        res.status(200).json({
            message:true,
            data:deletedtask
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}