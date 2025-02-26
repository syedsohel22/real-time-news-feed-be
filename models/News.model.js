const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    content: { type: String, required: true },
    views: { type: Number, default: 0, index: -1 },
    likes: { type: Number, default: 0, index: -1 },
    timestamp: { type: Date, default: Date.now, index: -1 },
  },
  { timestamps: true }
);

NewsSchema.index({ views: -1, likes: -1, timestamp: -1 });

module.exports = mongoose.model("News", NewsSchema);
