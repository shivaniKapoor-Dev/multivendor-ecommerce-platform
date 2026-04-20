const express = require("express");
const {
  createOrder,
  getUserOrders,
  requestCancelOrder,
  getVendorOrders,
  getAdminOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protectMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/orders", protectMiddleware, createOrder);
router.get("/orders", protectMiddleware, getUserOrders);
router.patch("/orders/:id/cancel-request", protectMiddleware, requestCancelOrder);
router.get("/vendor/orders", protectMiddleware, getVendorOrders);
router.get("/admin/orders-list", protectMiddleware, getAdminOrders);
router.patch("/admin/orders/:id", protectMiddleware, updateOrderStatus);

module.exports = router;
