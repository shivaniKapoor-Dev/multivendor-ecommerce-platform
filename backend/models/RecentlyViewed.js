const mongoose = require("mongoose");

const recentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("RecentlyViewed", recentSchema);