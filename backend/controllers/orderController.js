const Order = require("../models/Order");
const Vendor = require("../models/Vendor");
const Cart = require("../models/Cart");
const { buildOrderFromCart } = require("../utils/orderBuilder");

exports.createOrder = async (req, res) => {
  try {
    const { address, paymentMethod } = req.body;

    if (!address || !paymentMethod) {
      return res.status(400).json({ message: "Address and payment method are required" });
    }

    const { items, totalAmount, subtotal, shipping, tax } = await buildOrderFromCart(req.user.id);

    if (!items.length) {
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
      paymentStatus: paymentMethod === "Cash on Delivery" ? "pending" : "paid",
      status: "placed",
    });

    await Cart.deleteMany({ userId: req.user.id });

    res.status(201).json({
      message: "Order placed successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate("userId", "name email")
      .populate("items.productId", "name image price");

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.requestCancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "placed" && order.status !== "processing") {
      return res.status(400).json({ message: "This order cannot be cancelled now" });
    }

    order.status = "cancel_requested";
    await order.save();

    res.status(200).json({
      message: "Cancel request submitted",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVendorOrders = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.id });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const orders = await Order.find({ "items.vendorId": vendor._id })
      .sort({ createdAt: -1 })
      .populate("userId", "name email")
      .populate("items.productId", "name image price");

    const vendorOrders = orders.map((order) => {
      const filteredItems = order.items.filter((item) => {
        return item.vendorId && item.vendorId.toString() === vendor._id.toString();
      });

      return {
        ...order.toObject(),
        items: filteredItems,
      };
    });

    res.status(200).json({ orders: vendorOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdminOrders = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate("userId", "name email")
      .populate("items.productId", "name image price");

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      message: "Order status updated",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
