const express = require("express");
const router = express.Router();
const About = require("../models/About.cjs");

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
    let about = await About.findOne();
    if (!about) {
      about = new About(req.body);
    } else {
      Object.assign(about, req.body);
    }
    await about.save();
    res.json({ message: "About section saved successfully!", about });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete about (if needed)
router.delete("/", async (req, res) => {
  try {
    await About.deleteMany();
    res.json({ message: "About section deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
