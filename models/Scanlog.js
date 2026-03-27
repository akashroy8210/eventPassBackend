const mongoose=require("mongoose")

const scanLogSchema=new mongoose.Schema({
    ticketId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Ticket",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    scannedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:["success","rejected"],
        default:"success"
    },
    message:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model("ScanLog", scanLogSchema);