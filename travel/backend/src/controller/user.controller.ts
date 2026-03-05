import mongoose from "mongoose";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import User from "../models/user.model.js";

const TOKEN_EXPIRE_TIME = "24h";
const JWT_SECRET_KEY = process.env.JWT_SECRET as string;

export const Register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: "require all fields" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "invalid email" });
    }

    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({ success: false, message: "user already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET_KEY, { expiresIn: TOKEN_EXPIRE_TIME });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: { id: user._id, fullName, email }
    });
  } catch (error) {
    return res.status(500).json({ message: "register Api not work", error });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email & password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email & password" });
    }

    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET_KEY, { expiresIn: TOKEN_EXPIRE_TIME });

    return res.status(200).json({
      success: true,
      message: "user login successfully",
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email }
    });
  } catch (error) {
    return res.status(500).json({ message: "Login Api not work", error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized user" });
    }

    return res.status(200).json({
      success: true,
      user,
      message: "User found"
    });
  } catch {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};