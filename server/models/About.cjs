const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  paragraphs: [String], // for the 3 paragraphs
  quote: { type: String },
  image: { type: String },
  publicId: {type: String}, // URL to the about image
  stats: [
    {
      icon: String, // name of the icon (e.g., "Music", "Mic", etc.)
      label: String,
      value: String,
    },
  ],
});

module.exports = mongoose.model("About", AboutSchema);
