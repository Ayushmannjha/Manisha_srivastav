// routes/myActivity.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const MyActivity = require("../models/MyActivity.cjs");

// ✅ Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dajhl8jkt",
  api_key: process.env.CLOUDINARY_API_KEY || "548887874597267",
  api_secret: process.env.CLOUDINARY_API_SECRET || "fjj1jEDdc1BDShhQpiEQbpgA4dM",
});

// ✅ Multer configuration (store files in memory for buffer upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// --------------------------------------------------------
// 📤 Upload image (no folder) + description
// --------------------------------------------------------
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    if (!title || title.trim() === "") {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    if (!description || description.trim() === "") {
      return res.status(400).json({ success: false, message: "Description is required" });
    }

    console.log("Uploading image for activity:", title);

    // ✅ Upload directly to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {},
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ success: false, message: "Upload failed", error });
        }

        // ✅ Save to MongoDB
        const newActivity = new MyActivity({
          title,
          description,
          imageUrl: result.secure_url,
          publicId: result.public_id,
        });

        await newActivity.save();

        res.status(201).json({
          success: true,
          message: "Activity uploaded successfully",
          data: newActivity,
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// --------------------------------------------------------
// 🧾 Get all activities
// --------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const activities = await MyActivity.find().sort({ createdAt: -1 });
    res.json({ success: true, count: activities.length, data: activities });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --------------------------------------------------------
// ✏️ Edit (update) activity
// --------------------------------------------------------
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const existingActivity = await MyActivity.findById(id);
    if (!existingActivity) {
      return res.status(404).json({ success: false, message: "Activity not found" });
    }

    let updatedImageUrl = existingActivity.imageUrl;
    let updatedPublicId = existingActivity.publicId;

    // ✅ If a new image is uploaded, replace it in Cloudinary
    if (req.file) {
      await cloudinary.uploader.destroy(existingActivity.publicId);
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({}, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        });
        stream.end(req.file.buffer);
      });
      updatedImageUrl = result.secure_url;
      updatedPublicId = result.public_id;
    }

    // ✅ Update fields
    existingActivity.title = title || existingActivity.title;
    existingActivity.description = description || existingActivity.description;
    existingActivity.imageUrl = updatedImageUrl;
    existingActivity.publicId = updatedPublicId;

    await existingActivity.save();

    res.json({
      success: true,
      message: "Activity updated successfully",
      data: existingActivity,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// --------------------------------------------------------
// ❌ Delete activity (Cloudinary + MongoDB)
// --------------------------------------------------------
router.delete("/:publicId", async (req, res) => {
  try {
    const { publicId } = req.params;

    const activity = await MyActivity.findOne({ publicId });
    if (!activity) {
      return res.status(404).json({ success: false, message: "Activity not found" });
    }

    // ✅ Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // ✅ Delete from DB
    await MyActivity.findOneAndDelete({ publicId });

    res.json({
      success: true,
      message: "Activity deleted successfully from Cloudinary and database",
    });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
