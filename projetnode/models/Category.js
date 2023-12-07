const mongoose=require("mongoose")
const Categoryschema=new mongoose.Schema({
    nom_category:{
        type:String
    },
    image:{
        type:String
    },
    place:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"place"
      }]
})
module.exports=mongoose.model("category",Categoryschema)