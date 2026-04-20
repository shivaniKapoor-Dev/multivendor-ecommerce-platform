const Cart = require('../models/Cart');
const Product = require('../models/product');
const { isVendorPublic } = require("../utils/vendorVisibility");


exports.addToCart = async (req,res)=>{
  try{
    const {productId} = req.body
    const userId = req.user.id
    const product = await Product.findById(productId)
    if(!product){
      return res.status(400).json({message:"Product not found"})
    }

    if (product.isBlocked || product.inStock === false) {
      return res.status(400).json({ message: "Product is not available" });
    }

    const vendorVisible = await isVendorPublic(product.vendor);

    if (!vendorVisible) {
      return res.status(400).json({ message: "Product is not available" });
    }

    const existingItem = await Cart.findOne({userId,productId})

    if(existingItem){
      existingItem.quantity += 1
      await existingItem.save()

      return res.json({
        message:"Quantity updated",
        cart:existingItem,
        isAdded:true
      })
    }

    const cart = await Cart.create({
      userId,
      productId,
      quantity:1
    })

    res.json({
      message:"Product added to cart",
      isAdded:true,
      cart
    })

  }catch(error){
    res.status(500).json({message:error.message})
  }
}

//view cart
exports.viewCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user.id }).populate("productId");
    const visibleCartItems = [];

    for (const cartItem of cartItems) {
      const product = cartItem.productId;

      if (!product || product.isBlocked || product.inStock === false) {
        continue;
      }

      const vendorVisible = await isVendorPublic(product.vendor);

      if (vendorVisible) {
        visibleCartItems.push(cartItem);
      }
    }

    res.status(200).json({
      message: "Cart fetched successfully",
      cartItems: visibleCartItems
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//quantity
exports.cartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { id } = req.params;

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cartItem = await Cart.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { quantity },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({
      message: "Quantity updated",
      cartItem
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCart = async(req, res)=>{
  try{
    const userId = req.user.id
    const {productId} = req.params;
    await Cart.findOneAndDelete({userId, productId})
    res.status(200).json({message: "item deleted sucessfully", isDeleted:true})
  }catch(error){
    res.status(500).json({message: error.message})
  }
}
