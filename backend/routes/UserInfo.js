const express = require('express');
const { userInfo, updateStatus } = require('../controllers/userInfo');
const { protectMiddleware } = require('../middleware/authMiddleware');
const { userDashboard } = require('../controllers/userDashboard');
const router = express.Router();

router.get('/userInfo',protectMiddleware ,userInfo);
router.put('/userStatus/:id', protectMiddleware, updateStatus);

//userDahsboard
router.get('/userDashboard',protectMiddleware ,userDashboard)
module.exports = router;