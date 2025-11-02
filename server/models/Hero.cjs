const mongoose = require("mongoose");

const HeroSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: [{ type: String, required: true }], // e.g. ["Singer", "Performer", "Storyteller"]
  description: { type: String, required: true },
  image: { type: String }, // Cloudinary URL
  publicId: { type: String }, // Cloudinary public_id
});

module.exports = mongoose.model("Hero", HeroSchema);
