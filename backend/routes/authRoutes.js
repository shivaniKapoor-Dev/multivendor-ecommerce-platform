const express = require("express");
const { registerUser, loginUser, registerVendor, logout, changePassword} = require('../controllers/authController');
const { userRegisterValidator, vendorRegisterValidator } = require("../validators/authValidator");
const validateRequest = require("../middleware/validateRequest");
const { protectMiddleware } = require("../middleware/authMiddleware");
const router  = express.Router();

router.post("/register", userRegisterValidator, validateRequest, registerUser);
router.post("/registervendor", vendorRegisterValidator, validateRequest, registerVendor)
router.post("/login", loginUser);
router.post("/logout", logout);
router.put("/changePassword", protectMiddleware, changePassword);


module.exports = router;
