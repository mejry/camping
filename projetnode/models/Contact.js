const mongoose=require("mongoose")

const contacshcema= new mongoose.Schema({
    name:{
        type:String
    },
    prename:{
        type:String
    },
    num:{
        type:String
    },
    email:{
        type:String
    },
    msg:{
        type:String
    }
})

module.exports=mongoose.model("contact",contacshcema)