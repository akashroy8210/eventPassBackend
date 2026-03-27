const express=require("express")
const { getScanLogs } = require("../controllers/adminControllers")
const { authMiddleware, authAdminMiddleware } = require("../middleware/authMiddleware")
const router=express.Router()

router.get("/scanlogs",authMiddleware,authAdminMiddleware,getScanLogs)

module.exports=router