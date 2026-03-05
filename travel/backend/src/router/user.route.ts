import express from "express";
import { Register, Login, getUser } from "../controller/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", Register);
userRouter.post("/login", Login);
userRouter.get("/getuser", auth, getUser);

export default userRouter;