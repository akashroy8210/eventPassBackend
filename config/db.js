const mongoose=require("mongoose")

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database succesfully connectedd ")
    }catch(error){
        console.log("DB ERROR",error)
        process.exit(1)
    }
}

module.exports=connectDB