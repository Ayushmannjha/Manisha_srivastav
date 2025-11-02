const express = require("express");
const router = express.Router();
const Video = require("../models/Video.cjs");

// ✅ Get all videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find().sort({ order: 1, _id: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add new video
router.post("/", async (req, res) => {
  try {
    const video = new Video(req.body);
    await video.save();
    res.json({ message: "Video added successfully!", video });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update video
router.put("/:id", async (req, res) => {
  try {
    const updated = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Video updated successfully!", video: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete video
router.delete("/:id", async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: "Video deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
