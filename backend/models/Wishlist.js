const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
    user:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    
}, {timeStamps:true})

module.exports = mongoose.model("Wishlist", wishlistSchema);