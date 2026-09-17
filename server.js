import express from "express";
import session from "express-session";
import connectdb from "./config/db.config.js";
import 'dotenv/config';
import authrouter from "./routes/auth.route.js";
import taskrouter from "./routes/task.route.js";
const app = express();
app.use(express.json());
app.use(session({
    secret: process.env.SECRET_KEY || "mysecretkey",
    resave: false,
    saveUninitialized: false
}));
connectdb();
const PORT = process.env.PORT || 3030
app.use('/auth',authrouter);
app.use('/task',taskrouter);
app.get('/',(req,res)=>{
    res.status(201).send('Welcome');
})
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})
