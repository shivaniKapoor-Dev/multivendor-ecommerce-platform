const Product = require('../models/product');
const { getPublicVendorIds } = require("../utils/vendorVisibility");

exports.searchBar = async(req, res)=>{
try{
    const { query } = req.query;
    const vendorIds = await getPublicVendorIds();
    const products = await Product.find(
        {
          isBlocked: { $ne: true },
          vendor: { $in: vendorIds },
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { brand: { $regex: query, $options: 'i' } },
            { category: { $regex: query, $options: 'i' } },
            { subCategory: { $regex: query, $options: 'i' } },
            { tags: { $regex: query, $options: 'i' } }
          ]
        })
    if(products.length <= 0){
    res.status(400).json({message:"product not found"})
    }
    res.status(200).json({message:"all products", products})
}catch(error){
    res.status(500).json({message: error.message})
}
}
