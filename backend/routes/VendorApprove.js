const express = require('express');
const { protectMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { Vendors, updateVendorStatus } = require('../controllers/vendorApproval');
const router = express.Router();


router.get('/vendors', protectMiddleware, isAdmin, Vendors);
router.post('/updateVendorStatus/:id', protectMiddleware, isAdmin, updateVendorStatus);

module.exports = router;
