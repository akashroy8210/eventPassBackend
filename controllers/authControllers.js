const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const validator = require("validator")

exports.signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter all fields"
            })
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email"
            })
        }
        if(!validator.isStrongPassword(password)){
            return res.status(400).json({
                success: false,
                message: "Please enter a strong password"
            })
        }
        const exists = await User.findOne({ email })
        if (exists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password,salt)
        const user=await User.create(
            {
                name,
                email,
                password:hashPassword
            }
        )
        res.status(200).json({
            success: true,
            message: "User created successfully",
            user
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
}
}


exports.loginUser=async(req,res)=>{
    console.log("login user")
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter all fields"
            })
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User does not exist Please Signup"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            })
        }
        
        const token=jwt.sign({id:user._id,role:user.role},process.env.SECRET,{expiresIn:"1h"})
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            role:user.role,
            token
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}