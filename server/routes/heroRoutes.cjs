const express = require("express");
const router = express.Router();
const Hero = require("../models/Hero.cjs");
const cloudinary = require("cloudinary").v2;

// 🔧 Cloudinary configuration (move to env in production)
cloudinary.config({
  cloud_name: "dajhl8jkt",
  api_key: "548887874597267",
  api_secret: "fjj1jEDdc1BDShhQpiEQbpgA4dM",
});

// ✅ GET hero info
router.get("/", async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add or Update Hero info (single entry)
router.post("/", async (req, res) => {
  try {
    const { name, tagline, description, image, publicId } = req.body;
    let hero = await Hero.findOne();

    if (hero) {
      // 🧹 If new image provided, delete old one from Cloudinary
      if (image && hero.publicId && hero.publicId !== publicId) {
        try {
          await cloudinary.uploader.destroy(hero.publicId);
          console.log("🧹 Old Cloudinary image deleted:", hero.publicId);
        } catch (cloudErr) {
          console.error("⚠️ Cloudinary delete error:", cloudErr);
        }
      }

      // 📝 Update existing hero
      hero.name = name;
      hero.tagline = Array.isArray(tagline)
        ? tagline
        : JSON.parse(tagline || "[]");
      hero.description = description;
      hero.image = image;
      hero.publicId = publicId;
    } else {
      // 🆕 Create new hero section
      hero = new Hero({
        name,
        tagline: Array.isArray(tagline)
          ? tagline
          : JSON.parse(tagline || "[]"),
        description,
        image,
        publicId,
      });
    }

    await hero.save();
    res.json({ message: "Hero section saved successfully!", hero });
  } catch (err) {
    console.error("❌ Error saving Hero section:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete hero (and its Cloudinary image)
router.delete("/", async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (hero && hero.publicId) {
      try {
        await cloudinary.uploader.destroy(hero.publicId);
        console.log("🧹 Deleted Cloudinary image:", hero.publicId);
      } catch (cloudErr) {
        console.error("⚠️ Cloudinary delete error:", cloudErr);
      }
    }

    await Hero.deleteMany();
    res.json({ message: "Hero section and image deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
