const Product = require('../models/product');
const Vendor = require('../models/Vendor');
const User = require('../models/User');
const Order = require('../models/Order');
const Wishlist = require('../models/Wishlist');
const RecentlyViewed = require("../models/RecentlyViewed");
const { getPublicVendorIds } = require("../utils/vendorVisibility");

const updateAverageRating = (reviews = []) => {
  if (!reviews.length) return 0;

  const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
  return Number((total / reviews.length).toFixed(1));
};

// vendor Add product
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      discount,
      subCategory,
      brand,
      details,
      price,
      quantity,
      colour,
      inStock,
      trending,
      bestseller,
      limitedTimeDeal,
      featured,
      isNewArrival,
    } = req.body;

    const tags = req.body.tags ? JSON.parse(req.body.tags) : [];
    const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];
    const userId = req.user?.id
    const vendor = await Vendor.findOne({userId});

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

    const product = await Product.create({
      name,
      description,
      category:category.toLowerCase(),
      subCategory:subCategory.toLowerCase(),
      brand,
      price,
      discount,
      quantity,
      colour,
      inStock,
      trending,
      featured,
      details,
      isNewArrival,
      bestseller,
      limitedTimeDeal,
      tags,
      sizes,
      image: req.file?.filename,
      vendor: vendor._id,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error); 
    res.status(500).json({ error: error.message });
  }
};

// get product details vendor
exports.productPage = async(req, res)=>{
    try{
        const userId = req.user.id;

        const vendor = await Vendor.findOne({userId});

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        const products = await Product.find({vendor : vendor._id})
            .populate("vendor", "storeName isVerified");

        return res.status(200).json({message: "ALL products", products});

    }catch(error){
        return res.status(500).json({message: error.message});
    }
};


// update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const toBoolean = (val) => val === "true" || val === true;

    const updateData = {
      name: req.body.name,
      price: Number(req.body.price),
      quantity: Number(req.body.quantity),
      description: req.body.description,
      colour: req.body.colour,

      category: req.body.category?.toLowerCase() || "",
      subCategory: req.body.subCategory?.toLowerCase() || "",
      brand: req.body.brand?.toLowerCase() || "",

      tags: req.body.tags
        ? req.body.tags.split(",").map(i => i.trim().toLowerCase())
        : [],

      sizes: req.body.sizes
        ? req.body.sizes.split(",").map(i => i.trim().toLowerCase())
        : [],

      inStock: toBoolean(req.body.inStock),
      trending: toBoolean(req.body.trending),
      featured: toBoolean(req.body.featured),
      bestseller: toBoolean(req.body.bestseller),
      limitedTimeDeal: toBoolean(req.body.limitedTimeDeal),
      isNewArrival: toBoolean(req.body.isNewArrival),

      discount: Number(req.body.discount) || 0,
      details: req.body.details || ""
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const vendor = await Vendor.findOne({ userId: req.user.id });
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const product = await Product.findOneAndUpdate(
      { _id: id, vendor: vendor._id },
      updateData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found or not authorized"
      });
    }

    res.status(200).json({
      message: "Product Updated Successfully",
      product
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// delete products
exports.deleteProduct= async(req, res)=>{
    try{
        const {id} = req.params;
        const userId = req.user.id;

        const vendor = await Vendor.findOne({ userId });

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        await Product.findOneAndDelete({
            _id: id,
            vendor: vendor._id
        });

        res.status(200).json({message: "deleted sucessfully"});

    }catch(error){
        res.status(500).json({message: error.message});
    }
};


// view all products
exports.AllProducts = async(req, res)=>{
    try{
        const vendorIds = await getPublicVendorIds();

        const products = await Product.find({
            isBlocked: { $ne: true },
            vendor: { $in: vendorIds }
        }).sort({createdAt:-1});

        if(!products){
            return res.status(400).json({message:"products not found"});
        }

        res.status(200).json({message:"all products", products:products});

    }catch(error){
        res.status(500).json({message:error.message});
    }
};


// category search
exports.viewProducts = async (req, res) => {
  try {
    const { category } = req.params;
    const { colour, size, inStock } = req.query;
    const vendorIds = await getPublicVendorIds();

    const parseCsv = (value) =>
      String(value || "")
        .split(",")
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean);

    const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const colourList = parseCsv(colour);
    const sizeList = parseCsv(size);
    const normalizedCategory = String(category || "").trim();
    const exactCategoryRegex = new RegExp(`^${escapeRegex(normalizedCategory)}$`, "i");

    const query = {
      isBlocked: { $ne: true },
      vendor: { $in: vendorIds },
      $or: [
        { category: exactCategoryRegex },
        { subCategory: exactCategoryRegex },
        { tags: exactCategoryRegex }
      ]
    };

    if (colourList.length > 0) {
      query.colour = {
        $in: colourList.map((item) => new RegExp(`^${escapeRegex(item)}$`, "i"))
      };
    }

    if (sizeList.length > 0) {
      query.sizes = {
        $in: sizeList.map((item) => new RegExp(`^${escapeRegex(item)}$`, "i"))
      };
    }

    if (typeof inStock !== "undefined") {
      query.inStock = String(inStock) === "true";
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      message: "all products",
      products
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single product
exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const vendorIds = await getPublicVendorIds();

        const product = await Product.findOne({
            _id: id,
            isBlocked: { $ne: true },
            vendor: { $in: vendorIds }
        }).populate("vendor", "storeName isVerified description userId status");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "request fulfilled",
            product
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// related products
exports.relatedProducts = async (req, res) => {
  try {
    const { category, id } = req.params;

    const normalizedCategory = category.toLowerCase();
    const vendorIds = await getPublicVendorIds();

    const products = await Product.find({
      isBlocked: { $ne: true },
      vendor: { $in: vendorIds },
      category: normalizedCategory,
      _id: { $ne: id } 
    })
      .limit(8) 
      .lean();

    res.status(200).json({
      message: "request fulfilled",
      products,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//trends based sorting
exports.trends = async(req,res)=>{
    try{
        const { category } = req.params;
        const vendorIds = await getPublicVendorIds();
        const products = await Product.find({ 
         isBlocked: { $ne: true },
         vendor: { $in: vendorIds },
         $or:[
            {category: {$in:category}},
            {trending: true}
         ]
        })

        res.status(200).json({message:"all products", products});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

//recommendation
exports.recommendationProducts = async(req, res)=>{
  try{
    const userId = req.user.id;
    
  }catch(error){
    res.status(500).json({message:error.message})
  }
}

//wishlist
exports.wishlist =async(req, res)=>{
  try{
    const userId = req.user.id;
    const {productId}= req.body;
    console.log(userId)
    const isExist = await Wishlist.findOne({user:userId,product:productId})
        if(isExist){
          await Wishlist.findByIdAndDelete(isExist._id);
   return res.status(200).json({isAdded:false, message: "Removed product from wishlist"})
    }else{
      await Wishlist.create({
        user:userId,
        product:productId
      });
    return res.status(201).json({ isAdded: true, message: "Added to wishlist" });

    }

  }catch(error){
    res.status(500).json({message: error.message})
  }
}

//get wishlist
exports.getWishlist = async(req, res)=>{
  try{
    const userId = req.user.id;
    const wishlist = await Wishlist.find({user:userId}).populate("product");
    if(!wishlist){
      return res.status(400).json({message:"No products found"})
    }
    const wishlistLength = await Wishlist.countDocuments({ user: userId })
    return res.status(200).json({message:"wishlist products",wishlist, wishlistLength})

  }catch(error){
    res.status(500).json({message:error.message})
  }
}
//wishlist delete
exports.deleteWishlist = async(req, res)=>{
  try{
    const {id} = req.params;
    const userId = req.user.id;

   const deleted = await Wishlist.findOneAndDelete({
      user: userId,
      product: id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }
     res.status(200).json({message: "product deleted sucessfully"})

  }catch(error){
    res.status(500).json({message: error.message})
  }
}

//recent  product
exports.trackVisit = async (req, res) => {
  try {
    const userId = req.user?.id || null;
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "productId required" });
    }

    await RecentlyViewed.findOneAndUpdate(
      { userId, productId },
      {
        $set: {
          userId,
          productId,
          updatedAt: new Date()
        }
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    );

    res.json({ success: true });

  } catch (error) {
    console.log("TRACK ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getRecentProducts = async (req, res) => {
  try {
    const userId = req.user?.id 
    const items = await RecentlyViewed.find({ userId })
      .populate("productId")
      .sort({ updatedAt: -1, createdAt: -1 })
      .limit(30);

    const seenProductIds = new Set();
    const uniqueItems = items.filter((item) => {
      const product = item.productId;
      const productId = product?._id?.toString();

      if (!productId || seenProductIds.has(productId)) {
        return false;
      }

      seenProductIds.add(productId);
      return true;
    }).slice(0, 10);

    res.json({ items: uniqueItems });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addProductReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const { rating, comment } = req.body;
    const vendorIds = await getPublicVendorIds();

    const product = await Product.findOne({
      _id: id,
      isBlocked: { $ne: true },
      vendor: { $in: vendorIds }
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hasDeliveredOrder = await Order.findOne({
      userId,
      status: "delivered",
      "items.productId": product._id
    });

    if (!hasDeliveredOrder) {
      return res.status(403).json({
        message: "Only users who received this product can give a review"
      });
    }

    const numericRating = Number(rating);

    if (!numericRating || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const existingReview = product.reviews.find(
      (review) => review.user?.toString() === userId.toString()
    );

    if (existingReview) {
      existingReview.rating = numericRating;
      existingReview.comment = String(comment || "").trim();
      existingReview.userName = user.name || "User";
    } else {
      product.reviews.push({
        user: userId,
        userName: user.name || "User",
        rating: numericRating,
        comment: String(comment || "").trim()
      });
    }

    product.rating = updateAverageRating(product.reviews);
    await product.save();

    return res.status(200).json({
      message: existingReview ? "Review updated successfully" : "Review added successfully",
      product
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//guest  product wishlist
exports.productWishlist = async(req, res)=>{
  try{
    const ids = String(req.query.ids || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    if (!ids.length) {
      return res.status(200).json({message:"wishlist is empty", product: []})
    }
    const product = await Product.find({ _id: { $in: ids } })
    res.status(200).json({message:"wishlist products for localstorage", product})

  }catch(error){
res.status(500).json({message:error.message});
  }
}
//guest user receny product
exports.getGuestRecentProducts = async (req, res) => {
  try {
    const ids = String(req.query.ids || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    if (!ids.length) {
      return res.json({ items: [] });
    }

    const items = await Product.find({ _id: { $in: ids } })
      .limit(10);

    res.json({ items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.adminProducts = async(req, res)=>{
    try{
        if(req.user.role !== "admin"){
            return res.status(403).json({message:"Admin access required"});
        }

        const products = await Product.find().sort({createdAt:-1});
        return res.status(200).json({message:"all admin products", products});

    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

exports.updateProductBlock = async(req, res)=>{
    try{
        if(req.user.role !== "admin"){
            return res.status(403).json({message:"Admin access required"});
        }

        const {id} = req.params;
        const {isBlocked} = req.body;
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({message:"Product not found"});
        }

        product.isBlocked = isBlocked;
        await product.save();

        return res.status(200).json({message:"Product status updated successfully", product});

    }catch(error){
        return res.status(500).json({message:error.message});
    }
}
