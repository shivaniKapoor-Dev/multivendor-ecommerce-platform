const express = require('express')
const { Verify_payment, Create_payment} = require('../controllers/payment.js')
const { protectMiddleware } = require("../middleware/authMiddleware");

const router = express.Router()

router.post('/create_payment',protectMiddleware ,Create_payment )
router.post('/verify_payment',protectMiddleware ,Verify_payment )

module.exports = router;