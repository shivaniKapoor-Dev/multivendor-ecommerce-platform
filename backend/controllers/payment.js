const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { buildOrderFromCart } = require("../utils/orderBuilder");

exports.Create_payment = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { items, subtotal, shipping, tax, totalAmount } = await buildOrderFromCart(req.user.id);

    if (!items.length || totalAmount <= 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const option = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      notes: {
        userId: String(req.user.id),
        subtotal: String(subtotal),
        shipping: String(shipping),
        tax: String(tax),
      },
    };

    const order = await razorpay.orders.create(option);

    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
      totals: {
        subtotal,
        shipping,
        tax,
        totalAmount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.Verify_payment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      address,
      paymentMethod,
    } = req.body;

    if (!req.user?.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Missing payment verification fields" });
    }

    if (!address || !paymentMethod) {
      return res.status(400).json({ message: "Address and payment method are required" });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const existingOrder = await Order.findOne({ paymentId: razorpay_payment_id });

    if (existingOrder) {
      return res.status(200).json({
        success: true,
        message: "Payment already verified",
      });
    }

    const { items, subtotal, shipping, tax, totalAmount } = await buildOrderFromCart(req.user.id);

    if (!items.length || totalAmount <= 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    await Order.create({
      userId: req.user.id,
      items,
      address,
      paymentMethod,
      subtotal,
      shipping,
      tax,
      totalAmount,
      status: "placed",
      paymentId: razorpay_payment_id,
      paymentStatus: "paid",
    });

    await Cart.deleteMany({ userId: req.user.id });

    res.status(200).json({
      success: true,
      message: "Payment verified and order placed",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
