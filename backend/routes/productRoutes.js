const express = require('express');
const { createProduct, productPage, updateProduct, viewProducts, deleteProduct, AllProducts, getProduct, relatedProducts, wishlist, getWishlist, deleteWishlist, trackVisit, getRecentProducts, productWishlist, getGuestRecentProducts, updateProductBlock, adminProducts, addProductReview} = require('../controllers/productController');
const { protectMiddleware, isAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();
//vendor 

router.post('/createProduct',protectMiddleware, upload.single("image") ,createProduct);
router.get('/productPage',protectMiddleware ,productPage)
router.put('/updateProduct/:id',protectMiddleware, upload.single("image"), updateProduct)
router.delete('/deleteProduct/:id',protectMiddleware, deleteProduct)
router.get('/admin/productsList', protectMiddleware, isAdmin, adminProducts)
router.put('/admin/productStatus/:id', protectMiddleware, isAdmin, updateProductBlock)

//user
router.get('/products/:category' ,viewProducts)
router.get('/products' ,AllProducts)
router.get('/productInfo/:id', getProduct )
router.post('/productReview/:id', protectMiddleware, addProductReview)
router.get('/relatedProducts/:category' ,relatedProducts);
router.post('/addWishlist' ,protectMiddleware, wishlist);
router.get('/getwishlist' ,protectMiddleware, getWishlist);
router.post("/trackVisit", protectMiddleware, trackVisit);
router.get("/recentProducts", protectMiddleware, getRecentProducts);
router.delete('/deleteWishlist/:id' ,protectMiddleware, deleteWishlist);
//localStorage
router.get("/productLS", productWishlist);
router.get("/productRecent", getGuestRecentProducts);



module.exports = router;

