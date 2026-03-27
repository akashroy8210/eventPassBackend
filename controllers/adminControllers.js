const ScanLog = require("../models/Scanlog")
const Ticket = require("../models/ticketModel")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const validator = require("validator")

exports.getScanLogs=async(req,res)=>{
    try{
        const logs=await ScanLog.find({}).populate("scannedBy","name").populate("userId","name email").populate("ticketId").sort("-createdAt")
        res.status(200).json({success:true,logs})
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error})
    }
    }
