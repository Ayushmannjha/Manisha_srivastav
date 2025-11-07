// routes/myActivity.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const MyActivity = require("../models/MyActivity.cjs");

cloudinary.config({
  cloud_name: "dajhl8jkt",
  api_key: "548887874597267",
  api_secret: "fjj1jEDdc1BDShhQpiEQbpgA4dM",
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📤 Upload image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const uploadStream = cloudinary.uploader.upload_stream(
      // ❌ Removed { folder: "myactivity" }
      async (error, uploadResult) => {
        if (error) return res.status(500).json({ error });

        const newImage = new MyActivity({
          imageUrl: uploadResult.secure_url,
          publicId: uploadResult.public_id, // now it won't have 'myactivity/' prefix
        });

        await newImage.save();
        res.status(201).json(newImage);
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🧾 Get all images
router.get("/", async (req, res) => {
  const images = await MyActivity.find().sort({ createdAt: -1 });
  res.json(images);
});

// ❌ Delete image
router.delete("/:publicId", async (req, res) => {
  try {
    const { publicId } = req.params;

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete image record from MongoDB
    await MyActivity.findOneAndDelete({ publicId });

    res.json({ message: "Image deleted successfully from Cloudinary and database" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
