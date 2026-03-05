import fs from "fs";
import path from "path";
export const imageUpload = async (req, res) => {
    try {
        // Check if file was uploaded by multer middleware
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }
        const imageUrl = `/upload/${req.file.filename}`;
        return res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            imageUrl,
        });
    }
    catch (error) {
        console.error("Error in imageUpload:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
export const imageDelete = async (req, res) => {
    try {
        const { imageUrl } = req.body;
        if (!imageUrl) {
            return res.status(400).json({
                success: false,
                message: "Image URL is required",
            });
        }
        // Extract filename from URL
        const filename = path.basename(imageUrl);
        const filePath = path.join("./upload", filename);
        // Check if file exists
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return res.status(200).json({
                success: true,
                message: "Image deleted successfully",
            });
        }
        else {
            return res.status(404).json({
                success: false,
                message: "Image not found",
            });
        }
    }
    catch (error) {
        console.error("Error in imageDelete:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
//# sourceMappingURL=image.controller.js.map