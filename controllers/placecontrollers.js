const place =require("../models/Place")
const user=require("../models/users")
const category=require("../models/Category")
const rate = require("../models/rate")
const mongoose=require("mongoose")







exports.addplace=async(req,res)=>{
    try {

        let id =req.body.id
        let idcategory=req.body.idcat
        let existe_user= await user.findById(id)
        const new_place= new place({
            nom_place:req.body.nom_place,
            location:req.body.location,
            gouvernerant:req.body.gouvernerant,
            ville:req.body.ville,
            description:req.body.description,
            detail:req.body.detail,
            pics:[]
        })
        if(existe_user.role=="Admin" ||existe_user.role=="Moderateur" ){
            new_place.aproved=true
        }
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                new_place.pics.push("http://localhost:5000" + file.path);
            });
        }
    
      const resultat=await new_place.save()
      await user.findByIdAndUpdate({
        _id:id
      },
   {$push:{place:resultat._id}},{
    new:true
   })
      await category.findByIdAndUpdate({
        _id:idcategory
      },
   {$push:{place:resultat._id}},
   {new:true}
      )

      res.status(200).json({result:resultat,message:"place ajouter avec succes"})


    } catch (error) {
        console.log(error);
        res.status(400).json("error d'ajouter place ")
    }
}
exports.updateplace=async(req,res)=>{
    try {
        const id=req.params.id

        let updateplace={
            nom_place:req.body.nom_place,
            location:req.body.location,
            gouvernerant:req.body.gouvernerant,
            ville:req.body.ville,
            description:req.body.description,
            detail:req.body.detail,
            pics:[]
           }
           if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                updateplace.pics.push("http://localhost:5000" + file.path);
            });
        }
        
           let update=await place.findByIdAndUpdate({
            _id:id
           },
          { ...updateplace},
          {
            new:true
          })
          res.status(200).json({resultat:update,message:"place update avec succes"})
        
    } catch (error) {
        console.log(error);
        res.status(400).json("faild update place") 
    }


}
exports.getallplace=async(req,res)=>{
    try {
        let idcategory=req.params.id
        let allPlace=[]
        const allplace = await place.find().populate("raiting");
      
        allplace.map(elem=>{
            let scorerate=0
        let nombre=0
           elem.raiting.map(score=>{
             nombre += score.scorerate
           })

         if(nombre>0){
            scorerate = nombre/elem.raiting.length
           
        }else{
            scorerate=0
        }
          
                      allPlace.push({
                        elem,
                        scorerate
                         
                      })
        })

        
     //allPlace.push({moyennerate:scorerate/nombre})
   

       
res.json(allPlace)
    } catch (error) {
        console.log(error);
    }
}


exports.getoneplace=async(req,res)=>{
    try {
        let idplace=req.params.id
        let allPlace=[]
        let scorerate=0
        let nombre=0
        const oneplace = await place.findById(idplace).populate("raiting");
      
       console.log(oneplace.raiting.length);
  nombre=oneplace.raiting.length
        oneplace.raiting.map(score=>{
            scorerate+=score.scorerate
         
       
           allPlace.push(score)
        })

        
     allPlace.push({moyennerate:scorerate/nombre})
   

       
res.json(allPlace)
    } catch (error) {
        console.log(error);
    }
}
exports.deleteplace=async(req,res)=>{
    try {
        const id=req.params.id
        let iduser=req.body.iduser
        const existeplace = await place.findById(id).populate(
            {
                path:"raiting",
                populate:{
                    path:"user"}
            }
        );
        const rates = await rate.findById(existeplace.raiting)
      
        if (!existeplace) {
            return res.status(404).json("place not found");
        }
        
  existeplace.raiting.map(async(elem)=>{
    await user.findByIdAndUpdate( {_id:elem.user._id},
        {
            $pull:{raiting: elem._id}
           }
           ,{new:true}
        )

  })
   
       await user.updateMany( {
        _id:  iduser
        
     
    },
        {
         $pull:{place: existeplace._id}
        }
        ,{new:true}
        ) 
            
     
           await   rate.deleteMany({
            _id:{
                $gte:rates
            }
        })

        await place.findByIdAndDelete({
            _id:id
          })
          res.status(200).json(existeplace)
        
    } catch (error) {
        console.log(error);
        res.status(400).json("faild delet place")
    }
}