const mongoose=require("mongoose")

const Placeschema=new mongoose.Schema({

    nom_place: {
        type:String,
       
    },
    location:{
        type:String
    },
    pics:{
        type:[String]
    },
    description:{
        type:String
    },
    detail:{
        type:[String]
    },
    gouvernerant:{
        type:String
    },
    ville:{
        type:String 
    },
    aproved:{
        type:Boolean,
        default:false
    },
    raiting:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"rate"
      } ]
})
module.exports=mongoose.model("place",Placeschema)