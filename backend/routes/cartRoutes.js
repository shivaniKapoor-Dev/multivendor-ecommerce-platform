const express = require('express');
const { addToCart, viewCart, cartQuantity, deleteCart } = require('../controllers/cart');
const { protectMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/addToCart', protectMiddleware, addToCart );
router.get('/viewCart', protectMiddleware, viewCart );
router.post('/quantity/:id', protectMiddleware, cartQuantity );
router.delete('/deleteCart/:productId' ,protectMiddleware, deleteCart);

module.exports = router; 