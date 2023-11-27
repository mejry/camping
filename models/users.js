const mongoose=require("mongoose")
const user= new mongoose.Schema({
    nom: {
        type:String
    },
    prenom: {
        type:String
    },
    email:{
         type:String
    },
    password:{
        type:String
    },
    active:{
type:Boolean
    },
    codevalidation:{
type:Number,

    },
    passwordHash:{
type:String
    },
    password_last_update: {
      type: Date,
      default: Date.now(),
    },
    role:{
        type:String,
        enum:["Admin","simple_user",'Moderateur']
    },
 place:[{
   type: mongoose.Schema.Types.ObjectId,
   ref:"place"
 }],
 raiting:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"rate"
  }
],

  favorite:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"place"
  }]
    
})
module.exports=mongoose.model("user",user)