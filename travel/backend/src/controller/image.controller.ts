import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const imageUpload = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const imageUrl = `/upload/${req.file.filename}`;

  return res.status(201).json({
    success: true,
    message: "Image uploaded successfully",
    imageUrl
  });
};

export const imageDelete = async (req: Request, res: Response) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ success: false, message: "Image URL is required" });
    }

    const filename = path.basename(imageUrl);
    const filePath = path.join("upload", filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.status(200).json({ success: true, message: "Image deleted successfully" });
    }

    return res.status(404).json({ success: false, message: "Image not found" });
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};