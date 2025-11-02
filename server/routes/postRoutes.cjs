const express = require("express");
const router = express.Router();
const Post = require("../models/Post.cjs");
const cloudinary = require("cloudinary").v2;

// 🟣 Configure Cloudinary
cloudinary.config({
  cloud_name: "dajhl8jkt",
  api_key: "548887874597267", // replace with your real key
  api_secret: "fjj1jEDdc1BDShhQpiEQbpgA4dM", // replace with your real secret
});

// ✅ Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Create new post
router.post("/", async (req, res) => {
  try {
    //console.log(req.body);
    const post = new Post(req.body);
    await post.save();

    res.json({ message: "Post added successfully!", post });
    //console.log("New post created:", post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update post
router.put("/:id", async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post updated successfully!", post: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete post + Cloudinary image
router.delete("/:id", async (req, res) => {
  try {
    console.log("Delete request for post:", req);
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // 🟣 Extract Cloudinary public ID from URL
    if (post.image) {
      const parts = post.image.split("/");
      const lastPart = parts.pop(); // e.g. "abcd1234.jpg"
      const publicId = lastPart.split(".")[0]; // remove .jpg
      const folder = parts.slice(parts.indexOf("upload") + 1).join("/"); // handle foldered uploads
      const fullPublicId = folder ? `${folder}/${publicId}` : publicId;

      // 🗑️ Delete from Cloudinary
      try {
        await cloudinary.uploader.destroy(publicId);
        console.log("🧹 Cloudinary image deleted:", publicId);
      } catch (cloudErr) {
        console.error("⚠️ Cloudinary delete error:", cloudErr);
      }
    }

    // 🗑️ Delete from MongoDB
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post and image deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
