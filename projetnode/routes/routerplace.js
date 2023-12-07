const express=require("express")
  const router=express.Router()
const placecontrollers = require("../controllers/placecontrollers")

var multer = require('multer');

 

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()  + '-' +file.originalname)
    }
});
var upload = multer({ storage: storage }); 

router.post("/addplace",placecontrollers.addplace)
router.put("/updateplace/:id",upload.array('images', 10),placecontrollers.updateplace)
router.get("/getallplace",placecontrollers.getallplace)
router.get("/getoneplace/:id",placecontrollers.getoneplace)
router.delete("/deleteplace/:id",placecontrollers.deleteplace)
router.get("/getmostrate",placecontrollers.mostrate)
module.exports=router