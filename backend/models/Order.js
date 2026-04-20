const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      lineTotal: {
        type: Number,
        required: true
      }
    }
  ],

  address: {
    fullName: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    landmark: {
      type: String
    }
  },

  paymentMethod: {
    type: String,
    required: true
  },

  subtotal: {
    type: Number,
    required: true
  },

  shipping: {
    type: Number,
    required: true
  },

  tax: {
    type: Number,
    required: true
  },

  totalAmount: {
    type: Number,
    required: true
  },
  paymentId: String,
paymentStatus: {
  type: String,
  enum: ["pending", "paid"],
  default: "pending"
},

  status: {
    type: String,
    enum: ['placed', 'processing', 'shipped', 'delivered', 'cancel_requested', 'cancelled'],
    default: 'placed'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
