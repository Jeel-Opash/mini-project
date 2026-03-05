import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import userRouter from "./router/user.route.js";
import userTravel from "./router/travel.route.js";
import imagemulter from "./router/image.route.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', userRouter);
app.use('/api/travel', userTravel);
app.use('/api/images', imagemulter);
app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
const PORT = 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
export default app;
//# sourceMappingURL=index.js.map