const express=require("express")
const router=express.Router()
const ratecontroolers=require("../controllers/ratecontroller")
router.post("/addrate",ratecontroolers.addrating)
router.delete("deleterate/:id",ratecontroolers.deleteraiting)
 

module.exports=router
