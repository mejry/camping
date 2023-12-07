const category=require('../models/Category')
const place =require("../models/Place")



 exports.addcategory=async(req,res)=>{
         try {
             const existe=await category.findOne({nom_category:req.body.nom_category})
             if(!existe){
                let new_category=new category({
                    nom_category:req.body.nom_category
        
                 })
             
                if(req.files.length>0){
                    req.files.map(file=>{
                 new_category.image=" http://localhost:5000/"+ file.path
                })
                }

           
                    let result=await  new_category.save()
                  res.status(200).json({resultat:result,message:"category add avec succes"})

            }else{
                res.status(400).json({message:"category déja existe"})
               
        
        }
            
         } catch (error) {
            console.log(error);
           res.status(400).json("faild add category") 
         }

 }

exports.updatecategory=async(req,res)=>{
    try {

const id=req.params.id
   let updatecategory={
    nom_category:req.body.nom_category
   }

   if(req.files.length>0){
    req.files.map(file=>{
 updatecategory.image=" http://localhost:5000/"+ file.path
})
}

   let update=await category.findByIdAndUpdate({
    _id:id
   },
  { ...updatecategory},
  {
    new:true
  }
   )

                  res.status(200).json({resultat:update,message:"category update avec succes"})

    } catch (error) {
        console.log(error);
        res.status(400).json("faild add category") 
    }
}
exports.deletecategory = async (req, res) => {
    try {
        const id = req.params.id;
        const existecategory = await category.findById(id);
      let places= await place.findById(existecategory.place)
        if (!existecategory) {
            return res.status(404).json("Category not found");
        }

      await   place.deleteMany({
            _id:{
                $gte:places
            }
        })
      await category.findByIdAndDelete({
        _id:id
      })

        res.status(200).json("Category and associated places deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(400).json("Failed to delete category");
    }
};

exports.affichecategory=async(req,res)=>{
    try {
        const id=req.params.id
       
        
            let affichecat=await category.findById(id).populate("place")

            existecategory.map(elem=>{
               elem.map(elem1=>{
                await 
               })
               })
            res.status(200).json({response:affichecat,message:"data afficher avec succes"})


        
    } catch (error) {
        console.log(error);
        res.status(400).json("faild get   category")
    }
}


exports.afficheallcategory=async(req,res)=>{
    try {

            let allcat=await category.find().populate("place")
        
            res.status(200).json({response:allcat,message:"data afficher avec succes"})


        
    } catch (error) {
        console.log(error);
        res.status(400).json("faild get category")
    }
}




