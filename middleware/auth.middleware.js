import { login } from "../controller/auth.controller.js"

export const authmiddleware = (req,res,next)=>{
    if(!req.session.user){
        res.status(401).send('Please Login');
    }
    else{
        next();
    }

}
