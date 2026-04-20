const bcrypt = require('bcryptjs');
const connectDB =  require('../config/db')
const User = require('../models/User');
require('dotenv').config({ path: "../.env" });

const seedAdmin = async() =>{
    try{  
       await connectDB()
        const adminExists = await User.findOne({email: process.env.ADMIN_EMAIL})
        if(adminExists) {
            console.log("AdminAlready Exists");
            process.exit();
        }
        const hashedPass =  await bcrypt.hash(process.env.ADMIN_PASS, 10);
        await User.create({
            name: "super Admin",
            email: process.env.ADMIN_EMAIL,
            password:hashedPass,
            role: "admin",
        });
        console.log("Admin created sucessfully");
        process.exit();

    }catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedAdmin();