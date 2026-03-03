import jwt, { type JwtPayload } from "jsonwebtoken";
import  type { Request, Response, NextFunction } from "express";
import User from "../models/user.model.js";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

interface TokenPayload extends JwtPayload {
  id: string;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET || "fallback_secret";

export const authMiddleware=async (req:Request,res:Response,next:NextFunction)=>{
    const authHeader=req.header('authorization');

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            success:false,
            message:'not authorized',
        })
    }
    const token=authHeader.split(' ')[1];
    
    if(!token){
        return res.status(401).json({
            success:false,
            message:'not authorized',
        })
    }
    
    try {
        const payload = jwt.verify(token, JWT_SECRET_KEY) as TokenPayload;
        const user = await User.findById(payload.id).select('-password').lean();

        if(!user){
            return res.status(401).json({
                success:false,
                message:'user not found',
            })
        }
        req.user=user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success:false,
            message:'invalid token',
        })
    }
}