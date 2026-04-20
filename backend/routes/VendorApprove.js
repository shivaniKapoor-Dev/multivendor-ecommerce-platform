const express = require('express');
const { protectMiddleware } = require('../middleware/authMiddleware');
const { Vendors, updateVendorStatus } = require('../controllers/vendorApproval');
const router = express.Router();


router.get('/vendors', protectMiddleware, Vendors);
router.post('/updateVendorStatus/:id', protectMiddleware,  updateVendorStatus);

module.exports = router;