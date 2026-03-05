import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model.js";

interface TokenPayload extends JwtPayload {
  id: string;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET as string;

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "not authorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY) as TokenPayload;
    const user = await User.findById(payload.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "user not found" });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "invalid token" });
  }
};