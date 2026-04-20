const Cart  = require('../models/Cart');
const User = require('../models/User');
const Wishlist = require('../models/Wishlist');

exports.userDashboard = async(req, res)=>{
    try{
        const userId = req.user.id;

        const wishlistLength = await Wishlist.countDocuments({user: userId});
        const cartLength = await Cart.countDocuments({userId: userId});

        res.json({ wishlistLength, cartLength })
        
    }catch(error){
        res.status(500).json({message:error.message})
    }
}


