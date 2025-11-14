const mongoose = require("mongoose");

const MyActivitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    description: { type: String, required: true, maxlength: 25000 }, // ✅ Added description field
  },
  { timestamps: true }
);

module.exports = mongoose.model("MyActivity", MyActivitySchema);
