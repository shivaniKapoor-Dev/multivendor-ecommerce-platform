const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  userName: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true,
    default: ""
  }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: {  
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    required: true,
    lowercase: true
  },

  subCategory: {
    type: String,
    lowercase: true
  },

  brand: {
    type: String,
    lowercase: true
  },

  tags: [String],

  price: {
    type: Number,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  inStock: {
    type: Boolean,
    default: true
  },

  image: String,

  colour: String,

  sizes: [String], 

  quantity: {
    type: Number,
    default: 0
  },
 details:{
  type:String, 
  required: true
 },
  trending: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  limitedTimeDeal: { type: Boolean, default: false },
  bestseller: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },

  rating: { type: Number, default: 0 },
  reviews: [reviewSchema],
  discount: { type: Number, default: 0 },
  isBlocked: { type: Boolean, default: false },

  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
