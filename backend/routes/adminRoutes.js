const express = require("express");
const { adminSummary } = require("../controllers/adminController");
const { protectMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/admin/summary", protectMiddleware, adminSummary);

module.exports = router;
