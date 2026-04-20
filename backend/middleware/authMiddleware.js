const jwt = require('jsonwebtoken');
exports.protectMiddleware = async(req, res, next)=>{
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch(error){
    console.log(error.message)
    return res.status(401).json({ message: "Token invalid or expired" });
  }
}

exports.isAdmin = async(req, res, next)=>{
 try{
  const role = req.user.role
  if(role === "admin"){
res.status(400).json({message:"Access Denied only admin can access"})
  }
  next();
  }catch(error){
    res.status(500).json({message: error.message})
}

}

exports.isVendor = async(req, res, next)=>{
 try{
  const role = req.user.role
  if(role === "vendor"){
res.status(400).json({message:"Access Denied only vendor can access"})
  }
  next();
  }catch(error){
    res.status(500).json({message: error.message})
}

}