const contact =require("../models/Contact")
const { findByIdAndDelete } = require("../models/users")



exports.addcontact=async(req,res)=>{
    try {
        const new_contact= new contact({
            name:req.body.name,
            prename:req.body.prename,
            num:req.body.num,
            email:req.body.email,
            msg:req.body.msg
        })

        let result= await new_contact.save()
        res.status(200).json({resultat:result,message:"message add avec succes"})
        
    } catch (error) {
        console.log(error);
        res.status(400).json("faild add message")
        
    }
}

exports.getallcontact=async(req,res)=>{

    try {
        let alcont= await contact.find()
        res.status(200).json({reponse:alcont,message:"data get with succes"})
    } catch (error) {
        console.log(error);
        res.status(400).json("failed to get data")
    }
}
exports.deletecontact=async(req,res)=>{

    try{
    const id=req.params.id

    let delconct= await contact.findByIdAndDelete({
        _id:id
     })

    res.status(200).json("data delete with succes")   
    }
    catch(error){
        console.log(error);
        res.status(400).json("failed to delete data")
    }

}