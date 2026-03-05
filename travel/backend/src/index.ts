import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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

app.use("/api/auth", userRouter);
app.use("/api/travel", travelRouter);
app.use("/api/images", imageRouter);

app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

const PORT = Number(process.env.PORT) || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;