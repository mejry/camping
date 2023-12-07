const Place = require("../models/Place")
const rate = require ("../models/rate")
const user=require("../models/users")
exports.addrating = async (req,res)=>{
    try {
        let iduser= req.body.iduser
        let idplace=req.body.idplace
         let existeuser= await user.findById(iduser)
         let existeplace= await Place.findById(idplace)
        const new_rate= new rate({
            scorerate:req.body.scorerate,
            message:req.body.message
        })
        
         const resultrate=await new_rate.save()

       await   rate.findByIdAndUpdate({
            _id:resultrate._id
         },
         {
            $addToSet:{user:existeuser._id}
         
         },{new:true})
        await  rate.findByIdAndUpdate({
            _id:resultrate._id
         },
         {
            

            $addToSet:{place:existeplace._id}
         
         },{new:true})
       await   Place.findByIdAndUpdate({
            _id:idplace},
            
           {     $addToSet:{raiting:resultrate._id}},
                {new:true}
            
         )
       await   user.findByIdAndUpdate({
            _id:iduser},
            
           {     $addToSet:{raiting:resultrate._id}},
                {new:true}
            
         )
         res.status(200).json({response:resultrate,message:"rate add with succes "})
    } catch (error) {
        console.log(error);
        res.status(400).json("faild to rate this place ")
    
    
    }
}


exports.deleteraiting=async(req,res)=>{
    try {

        const id=req.params.id
        const existerate=await rate.findById(id).populate("user")
        const user=await user.findByIdAndUpdate({
            _id:existerate.user
        },
       { $pull:{raiting:id}},{new:tre}
        )


        await rate.findOneAndDelete({_id:id}
            
            )
            res.status(200).json("rating delete with succes")
        
    } catch (error) {
        console.log(error);
        res.status(400).json("faild to delete raiting ")
    }
}
