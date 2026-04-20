const User = require('../models/User');

exports.userInfo = async(req, res)=>{
    try{
        const user = await User.find({
             role: {$nin: ["admin", "vendor"] }
            }).select("-password")
             .sort({createdAt: -1});
        return res.status(200).json({message:"All users", user:user})


    }catch(error){
        return res.status(500).json({message:error.message});

    }
}

//update status

exports.updateStatus = async(req, res)=>{
    try{
        const id = req.params.id;
        const {status} = req.body;
        const user = await User.findById(id);
        console.log(user);
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
       status === "active" ? user.status = "active" : user.status = "blocked"

       await user.save();
        return res.status(200).json({message: "status updated sucessfully", user})

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}
