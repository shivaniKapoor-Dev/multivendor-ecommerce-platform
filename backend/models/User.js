const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required:true },
  password: { type: String, select:false },

  role: {
    type: String,
    enum: ["user","vendor","admin"],
    default: "user"
  },
status:{
  type:String,
  enum:["blocked","active"],
  default:"active",
},
verificationToken:String,

recentProducts: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }
],
  
}, { timestamps:true });

module.exports = mongoose.model( "User", userSchema);