const jwt=require("jsonwebtoken")
const User=require("../models/userModel")

exports.authMiddleware=async(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader){
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }
    const token=authHeader.split(' ')[1];
    try{
        const decoded=jwt.verify(token,process.env.SECRET)
        req.user=decoded
        next()
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"invalid token"
        })
    }
}

exports.authAdminMiddleware=(req,res,next)=>{
    if(req.user.role!=="admin"){
        return res.status(401).json({
            success:false,
            message:"Admin only "
        })
    }
    next()
}