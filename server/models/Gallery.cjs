const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema(
  {
   
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
     // ✅ Added description field
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", GallerySchema);
