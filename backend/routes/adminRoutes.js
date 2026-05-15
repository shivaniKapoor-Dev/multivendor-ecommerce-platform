const express = require("express");
const { adminSummary } = require("../controllers/adminController");
const { protectMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/admin/summary", protectMiddleware, isAdmin, adminSummary);

module.exports = router;
