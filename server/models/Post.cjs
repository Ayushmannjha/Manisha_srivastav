const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },         // ✅ Required field
  date: { type: String, required: true },          // ✅ Required field (ISO string from frontend)
  preview: { type: String },                       // ✅ Optional short description
  image: { type: String },                         // ✅ Cloudinary image URL (secure_url)
  publicId: { type: String },                      // ✅ Cloudinary public_id (used for delete)
  category: { type: String, enum: ["Lyrics", "Blog"], default: "Blog" }, // ✅ Valid options
  content: { type: String },                       // ✅ Full lyrics/blog body
});

module.exports = mongoose.model("Post", PostSchema);