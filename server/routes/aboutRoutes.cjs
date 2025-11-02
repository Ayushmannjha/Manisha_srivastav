const express = require("express");
const router = express.Router();
const About = require("../models/About.cjs");
const cloudinary = require("cloudinary").v2;

// 🔧 Cloudinary config (replace with your credentials)
cloudinary.config({
  cloud_name: "dajhl8jkt",
  api_key: "548887874597267", // replace with your real key
  api_secret: "fjj1jEDdc1BDShhQpiEQbpgA4dM",
});

// ✅ Get about info
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add or Update about info (single entry)
router.post("/", async (req, res) => {
  try {
    const { title, subtitle, paragraphs, quote, image, publicId } = req.body;
    let about = await About.findOne();

    if (about) {
      // 🧹 If new image provided, delete old image from Cloudinary
      if (image && about.publicId && about.publicId !== publicId) {
        try {
          await cloudinary.uploader.destroy(about.publicId);
          console.log("🧹 Old Cloudinary image deleted:", about.publicId);
        } catch (cloudErr) {
          console.error("⚠️ Cloudinary delete error:", cloudErr);
        }
      }

      // 📝 Update existing
      about.title = title;
      about.subtitle = subtitle;
      about.paragraphs = paragraphs;
      about.quote = quote;
      about.image = image;
      about.publicId = publicId;
    } else {
      // 🆕 Create new
      about = new About({ title, subtitle, paragraphs, quote, image, publicId });
    }

    await about.save();
    res.json({ message: "About section saved successfully!", about });
  } catch (err) {
    console.error("❌ Error saving About section:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete about (and Cloudinary image)
router.delete("/", async (req, res) => {
  try {
    const about = await About.findOne();
    if (about && about.publicId) {
      try {
        await cloudinary.uploader.destroy(about.publicId);
        console.log("🧹 Deleted Cloudinary image:", about.publicId);
      } catch (cloudErr) {
        console.error("⚠️ Cloudinary delete error:", cloudErr);
      }
    }

    await About.deleteMany();
    res.json({ message: "About section and image deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
