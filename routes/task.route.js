import express from "express";
import { authmiddleware } from "../middleware/auth.middleware.js";
import { deletepost, getpost, taskpost, updatepost } from "../controller/task.controller.js";

const router = express.Router();
router.post('/post',authmiddleware,taskpost)
router.get('/get',authmiddleware,getpost)
router.put('/put/:id',authmiddleware,updatepost)
router.delete('/delete/:id',authmiddleware,deletepost)
export default router;