const express=require("express")
  const router=express.Router()
const categorycontrollers=require("../controllers/categorycontrollers")

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'category')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()  + '-' +file.originalname)
    }
});
 
var upload = multer({ storage: storage }); 
 router.post("/addcategory",upload.any("image"),categorycontrollers.addcategory)
  router.put("/updatecategory/:id",categorycontrollers.updatecategory)
  router.delete("/deletecategory/:id",categorycontrollers.deletecategory)
  router.get("/affichecategory/:id",categorycontrollers.affichecategory)
  router.get("/afficheallcategory",categorycontrollers.afficheallcategory)




  module.exports=router