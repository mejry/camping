const mongoose=require("mongoose")

const rateschema=new mongoose.Schema({
    place:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"place"},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"},
    scorerate:{
        type:Number
    },
    message:{
        type:String
    }
    
})
module.exports=mongoose.model("rate",rateschema)