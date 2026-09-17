import userModel from "../model/user.model.js";

export const login = async(req,res)=>{
    // const {name,phoneno,work} = req.body;
    // const user = new userModel({name,phoneno,work});
    // await user.save();
    try{
    const {name,phoneno,username} = req.body;
    const users = new userModel({name,phoneno,username});
    req.session.user = users;
    await users.save();
       res.status(201).json({
            message:true,
            data:users
        })
    }
    catch (error){
        res.status(401).json(`message:${error.message}`);

    }


}
export const loggout = (req,res)=>{
    res.status(201).send(`User has been logged out`);

}