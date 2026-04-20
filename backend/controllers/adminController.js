const User = require("../models/User");
const Vendor = require("../models/Vendor");
const Product = require("../models/product");
const Order = require("../models/Order");

exports.adminSummary = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const users = await User.countDocuments({ role: "user" });
    const vendors = await Vendor.countDocuments();
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();
    const revenueData = await Order.find({}, "totalAmount");

    const revenue = revenueData.reduce((sum, order) => {
      return sum + (order.totalAmount || 0);
    }, 0);

    return res.status(200).json({
      message: "Admin summary fetched",
      summary: {
        users,
        vendors,
        products,
        orders,
        revenue,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
