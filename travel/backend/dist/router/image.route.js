import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import { imageUpload, imageDelete } from "../controller/image.controller.js";
import upload from "../config/multer.js";
const imageRouter = express.Router();
imageRouter.post("/upload", auth, upload.single("image"), imageUpload);
imageRouter.delete("/delete", auth, imageDelete);
export default imageRouter;
//# sourceMappingURL=image.route.js.map