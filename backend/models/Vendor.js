const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    storeName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },

    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
    },

    gstNumber: {
      type: String,
      required: true,
      uppercase: true,
    },

    panNumber: {
      type: String,
      required: true,
      uppercase: true,
    },
accountNumber: {
      type: String,
      required: true,
    },
 ifscCode: {
      type: String,
      required: true,
      uppercase: true,
    },    
bankName  : {
      type: String,
    },  
    // ADMIN CONTROL
    isVerified: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "blocked"],
      default: "pending",
    },

    // RELATIONS
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
},
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);