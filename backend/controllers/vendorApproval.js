const mongoose  = require('mongoose');
const User = require('../models/User');
const Vendor = require('../models/Vendor');

exports.Vendors = async(req, res)=>{
    try{
        // const user = await User.find();
        const vendor = await Vendor.find().populate("userId", "name email");
        if(!vendor ){
            return res.status(400).json({message: "vendor not found"})
        }
        return res.status(200).json({message: "All vendors info", vendor: vendor });

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

exports.updateVendorStatus = async(req,res)=>{
    try{

        const vendorId = req.params.id;
        const {status} = req.body;
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    vendor.status = status;
    vendor.status === "approved" ? vendor.isVerified =true : vendor.isVerified= false;
    await vendor.save();
    
        return res.status(200).json({message:"Vendor updated successfully", vendor});

    }catch(error){
        return res.status(500).json({message: error.message}) 
    }
}
