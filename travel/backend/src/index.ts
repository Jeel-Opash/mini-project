import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./router/user.route.js";
import travelRouter from "./router/travel.route.js";
import imageRouter from "./router/image.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/auth", userRouter);
app.use("/api/travel", travelRouter);
app.use("/api/images", imageRouter);

app.get("/", (req, res) => {
  res.send("Travel Story API is running");
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is healthy" });
});

app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

const PORT = Number(process.env.PORT) || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  }).on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please stop the other process or use a different port.`);
    } else {
      console.error("Server starting error:", err);
    }
  });
}).catch((err) => {
  console.error("Database connection failed, server not started:", err);
});

export default app;