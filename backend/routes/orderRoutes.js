const express = require("express");
const {
  createOrder,
  getUserOrders,
  requestCancelOrder,
  getVendorOrders,
  getAdminOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protectMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/orders", protectMiddleware, createOrder);
router.get("/orders", protectMiddleware, getUserOrders);
router.patch("/orders/:id/cancel-request", protectMiddleware, requestCancelOrder);
router.get("/vendor/orders", protectMiddleware, getVendorOrders);
router.get("/admin/orders-list", protectMiddleware, isAdmin, getAdminOrders);
router.patch("/admin/orders/:id", protectMiddleware, isAdmin, updateOrderStatus);

module.exports = router;
