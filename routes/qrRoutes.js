const express=require("express")
const { generateQR, verifyQR } = require("../controllers/qrControllers")
const { authMiddleware, authAdminMiddleware } = require("../middleware/authMiddleware")
const router=express.Router()

router.get("/generate",authMiddleware,generateQR)
router.post('/verify',authMiddleware,authAdminMiddleware,verifyQR)

module.exports=router