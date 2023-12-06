const express=require("express")
const router=express.Router()
const contactcontroller=require("../controllers/contactcontrollers")
router.post("/addcontact",contactcontroller.addcontact)
router.get("/getcontact",contactcontroller.getallcontact)
router.delete("/deletecontact/:id",contactcontroller.deletecontact)

module.exports=router