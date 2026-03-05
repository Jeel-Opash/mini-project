import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import { imageUpload, imageDelete } from "../controller/image.controller.js";
import upload from "../config/multer.js";
const imagemulter = express.Router();
// Multer middleware applied before the controller
imagemulter.post('/upload', auth, (req, res, next) => {
    upload.single("image")(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err instanceof Error ? err.message : "Error uploading file",
            });
        }
        next();
    });
}, imageUpload);
imagemulter.delete('/delete', auth, imageDelete);
export default imagemulter;
//# sourceMappingURL=image.route.js.map