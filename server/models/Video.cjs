const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  youtubeId: { type: String, required: true },
  thumbnail: { type: String, required: true },
  order: { type: Number, default: 0 }, // for custom order in carousel
});

module.exports = mongoose.model("Video", VideoSchema);
