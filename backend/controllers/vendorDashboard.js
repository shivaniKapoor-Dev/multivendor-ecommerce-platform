const Vendor = require('../models/Vendor');

exports.vendorDashboard = async(req, res)=>{
    try{ 
const id = req.user.id;
 const user = await Vendor.findOne({userId:id});
 if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
return res.status(200).json({message:"Request sucess", user})

    }catch(error){
        return res.status(400).json({message: error.message})
    }
}

exports.updateVendorProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const { storeName, description, country, state, city, street, pincode } = req.body;

        const vendor = await Vendor.findOne({ userId: id });

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        if (!vendor.address) {
            vendor.address = {};
        }

        vendor.storeName = storeName || vendor.storeName;
        vendor.description = description || vendor.description;
        vendor.address.country = country || vendor.address.country;
        vendor.address.state = state || vendor.address.state;
        vendor.address.city = city || vendor.address.city;
        vendor.address.street = street || vendor.address.street;
        vendor.address.pincode = pincode || vendor.address.pincode;

        await vendor.save();

        return res.status(200).json({
            message: "Vendor profile updated successfully",
            user: vendor
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

exports.updateVendorBank = async (req, res) => {
    try {
        const id = req.user.id;
        const { accountNumber, ifscCode, bankName } = req.body;

        const vendor = await Vendor.findOne({ userId: id });

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        vendor.accountNumber = accountNumber || vendor.accountNumber;
        vendor.ifscCode = ifscCode || vendor.ifscCode;
        vendor.bankName = bankName || vendor.bankName;

        await vendor.save();

        return res.status(200).json({
            message: "Bank details updated successfully",
            user: vendor
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
