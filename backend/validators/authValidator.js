const {body} = require('express-validator');

const baseRegisterValidator = [
    //name
    body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({min:3}).withMessage("Username must be 3+ characters"),
    //email
    body("email")
    .isEmail().withMessage("Invalid email")
    .normalizeEmail()
    .trim()
    .notEmpty().withMessage("Name is required"),
    //password
    body("password")
    .isLength({min:6}).withMessage("Password must be at least 6 characters"),
];

exports.userRegisterValidator = [
  ...baseRegisterValidator,
];

exports.vendorRegisterValidator = [
  ...baseRegisterValidator,
    //storename
    body("storeName")
    .notEmpty().withMessage("Store name is required"),
     // PAN Number (India)
  body("panNumber")
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .withMessage("Invalid PAN format"),

  // GST Number (India GSTIN)
  body("gstNumber")
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)
    .withMessage("Invalid GST number"),

  // Account Number
  body("accountNumber")
    .isLength({ min: 9, max: 18 })
    .isNumeric()
    .withMessage("Invalid account number"),

  // IFSC Code
  body("ifscCode")
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/)
    .withMessage("Invalid IFSC code"),

  // Location
  body("country").notEmpty().withMessage("Country is required"),
  body("state").notEmpty().withMessage("State is required"),
  body("city").notEmpty().withMessage("City is required"),
];

exports.registerValidator = exports.vendorRegisterValidator;
