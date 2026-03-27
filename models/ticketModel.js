const mongoose=require("mongoose")

const ticketModel=new mongoose.Schema({
    ticketId:{
        type:String,
        required:true,
        unique:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    used:{
        type:Boolean,
        default:false
    },
    usedAt:{
        type:Date
    },
    scannedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},{timestamps:true})

module.exports=mongoose.model("Ticket",ticketModel)