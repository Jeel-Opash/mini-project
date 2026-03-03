import express from "express";  
import { Login, Register } from '../controller/user.controller.js';

const userRouter =express.Router();
userRouter.post('/register',Register);
userRouter.post('/login',Login);


export default userRouter;