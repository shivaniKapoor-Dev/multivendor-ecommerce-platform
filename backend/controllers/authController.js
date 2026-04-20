const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Vendor = require("../models/Vendor");


//  VENDOR REGISTER 
exports.registerVendor = async (req, res) => {
   try {
    const {
      name,
      email,
      password,
      storeName,
      panNumber,
      gstNumber,
      accountNumber,
      ifscCode,
      country,
      city,
      state,

    } = req.body;

    //  CHECK EXISTING USER
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    //  HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    //  CREATE USER (ROLE = VENDOR)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "vendor",
    });

    //  CREATE VENDOR PROFILE
    const vendor = await Vendor.create({
      userId: user._id,
      storeName,
      panNumber,
      gstNumber, 
      accountNumber,
       ifscCode,
       address:{
         country,
      city,
      state,
       }
      
    });
if(user){
    res.status(201).json({
      success: true,
      message: "Vendor registered successfully. Waiting for admin approval.",
      vendor,
    });
}
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Register
exports.registerUser = async (req, res) => {
    const { name, email, password} = req.body;
    try{
        const userExists = await User.findOne({email}).select("-password");
        if(userExists) {
            return res.status(400).json({message: "user already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password : hashedPassword,
            role: "user",
        });

       
      return  res.status(201).json({message: "User registered sucessfully",
            user
        });

    }
    catch (error){
        res.status(500).json({message: error.message});
    }
};

//login
exports.loginUser = async(req, res)=> {

  //generate token
  const generateToken = (user)=>{ 
  return jwt.sign(
              { id : user._id, role : user.role},
              process.env.JWT_SECRET_KEY,
              {expiresIn :"30d"}
           );}
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email}).select("+password");
        if(!user){
             return res.status(400).json({message: "Invalid credentials"})
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return  res.status(400).json({message: "Invalid credentials"})
            }
            
            const userResponse = user.toObject();
            delete userResponse.password;

            const token = generateToken(user);
            res.cookie("token", token,{
              httpOnly: true,
              secure: false,
              sameSite: 'lax',
              maxAge: 24 * 60 *60 *1000
            })
         return   res.json({message: "Login sucessfully",
                user: userResponse, token
            });
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

//logout
exports.logout = async(req, res)=>{
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
}

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is wrong" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}
