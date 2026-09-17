import express from "express";
import { loggout, login } from "../controller/auth.controller.js";

const router = express.Router();
router.post('/login',login);
router.get('/logout',loggout);
export default router;