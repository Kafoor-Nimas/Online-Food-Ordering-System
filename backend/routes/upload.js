import express from "express";
import upload from "../config/cloudinary.js";

const router = express.Router();

// single image upload, field name must be "image"
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ url: req.file.path }); // Cloudinary secure URL
});

export default router;
