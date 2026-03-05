import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/travel";
  const conn = await mongoose.connect(mongoUrl);
  console.log(`MongoDB Connected to: ${conn.connection.name}`);
};