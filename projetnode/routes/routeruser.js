const express=require("express")
  const router=express.Router()
const usercontroller = require("../controllers/usercontroller")

router.post("/signup",usercontroller.signup)
router.post("/signin",usercontroller.login)
router.put("/favorite",usercontroller.favorite)
router.post("/sendmail",usercontroller.createcomptemoderateur)
router.post("/resetpassword",usercontroller.motdepasseoblier)
router.get("/verfiertoken/:token",usercontroller.verfiertoken)
router.get("/changepassword",usercontroller.changepassword)
module.exports=router