const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Gallery = require("../models/Gallery.cjs");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dajhl8jkt",
  api_key: process.env.CLOUDINARY_API_KEY || "548887874597267",
  api_secret: process.env.CLOUDINARY_API_SECRET || "fjj1jEDdc1BDShhQpiEQbpgA4dM",
});

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });


// --------------------------------------------------------
// 📤 UPLOAD IMAGE (save only imageUrl + publicId)
// --------------------------------------------------------
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ success: false, message: "No file uploaded" });

    const uploadStream = cloudinary.uploader.upload_stream(
      {},
      async (error, result) => {
        if (error)
          return res.status(500).json({ success: false, message: "Upload failed", error });

        const newImage = new Gallery({
          imageUrl: result.secure_url,
          publicId: result.public_id,
        });

        await newImage.save();

        res.status(201).json({
          success: true,
          message: "Image uploaded successfully",
          data: newImage,
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// --------------------------------------------------------
// 📥 GET ALL GALLERY IMAGES
// --------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json({ success: true, count: images.length, data: images });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// --------------------------------------------------------
// ❌ DELETE IMAGE (Cloudinary + Mongo)
// --------------------------------------------------------
router.delete("/:publicId", async (req, res) => {
  try {
    const { publicId } = req.params;

    const image = await Gallery.findOne({ publicId });
    if (!image)
      return res.status(404).json({ success: false, message: "Image not found" });

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete from DB
    await Gallery.findOneAndDelete({ publicId });

    res.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
