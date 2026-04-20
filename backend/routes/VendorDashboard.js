const express = require('express');
const { vendorDashboard, updateVendorProfile, updateVendorBank } = require('../controllers/vendorDashboard');
const { protectMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/vendorDashboard', protectMiddleware ,vendorDashboard)
router.put('/vendor/profile', protectMiddleware, updateVendorProfile)
router.put('/vendor/bank', protectMiddleware, updateVendorBank)

module.exports = router;
