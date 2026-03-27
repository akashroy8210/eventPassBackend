const express=require("express")
const dotenv=require("dotenv")
const connectDB=require("./config/db")
const authRoutes=require('./routes/authRoutes')
const adminRoutes=require("./routes/adminRoutes")
const qrRoutes=require("./routes/qrRoutes")
const cors=require("cors")
dotenv.config()
const app=express()

app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.get('/',(req,res)=>{
    res.send("server is running")
})
app.use('/admin',adminRoutes)
app.use('/users',authRoutes)
app.use('/qr',qrRoutes)
connectDB();
const PORT=process.env.PORT || 8080;
app.listen(PORT,"0.0.0.0",()=>{
    console.log(`server is running on port http://localhost:${PORT}`)
})
