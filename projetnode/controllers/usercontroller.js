const user=require("../models/users")
const bcrypt = require('bcryptjs')
const jwt=require("jsonwebtoken")
const Place = require("../models/Place")
 const tokensecret="smlertjhmelrkjt62rzmtlhzrkt"
 const secretOrPrivateKey="mysecretKey"
 const nodemailer = require('nodemailer');

 const generator = require('generate-password');

 const randomstring = require('randomstring');


 var passwords = generator.generateMultiple(3, {
	length: 10,
	uppercase: false
});

exports.signup= async(req,res) =>{

    try {
        
        const existeuser=((req.body.email).toLowerCase()).trim()
        console.log(existeuser);
            const existbd= await user.findOne({
                email:existeuser
            })
            
            if (existbd){
                await  res.status(401).json({message:"email déja existe"})
            }else{
                let password=req.body.password
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(password, salt);
        let signup= new user({
                nom:req.body.nom, 
                prenom:req.body.prenom,
                email:existeuser,
                role:"simple_user",
                password:hashed
        })

        const save_singup= await signup.save()
       res.status(200).json({resultat:save_singup,message:"user singup  avec succes"})


            }

    } catch (error) {
        console.log(error);
           res.status(400).json(error) 
        
    }
}
exports.login = async (req, res) => {
    try {
        const existemail = (req.body.email || '').toLowerCase().trim();
        const existeuser = await user.findOne({ email: existemail }).lean();

        if (!existeuser) {
            return res.status(401).json("Check your email or password.");
        }

        const providedPassword = req.body.password;
        const passwordValid = await bcrypt.compare(providedPassword, existeuser.password);

        if (!passwordValid) {
            return res.status(401).json("Check your email or password.");
        }

        const payload = {
            id: existeuser._id,
            role: existeuser.role
        };

        const token = await jwt.sign(payload, tokensecret);

        
        const userWithoutPassword = { ...existeuser, password: undefined };

        res.status(200).json({ resultat: userWithoutPassword, token: token, message: "Sign in successful." });
    } catch (error) {
        console.error(error);
        res.status(400).json("Failed to sign in.");
    }
}

exports.favorite = async(req,res)=>{
    try {
        let iduser= req.body.iduser
        let idplace=req.body.idplace
        const existidplace = await Place.findById(iduser);
        const existuser = await user.findById(idplace);

        await user.findByIdAndUpdate({
            _id:iduser
        },
        {
            $addToSet:{favorite:idplace}
        },
        {
        new:true}
        )
        res.status(200).json("place favorite add with succe")

        
    } catch (error) {
        console.log(error);
        res.status(400).json("failed to add favorite")
        
    }
}

const transporter = nodemailer.createTransport({
   service:"gmail",
       auth: {
            user: 'younesmanita975@gmail.com',
            pass: 'ywod msnd eism pqhq',
         },
    tls: {
        rejectUnauthorized:false
    },
    });
exports.createcomptemoderateur=async(req,res)=>{
    try {
  

        const password = randomstring.generate({
         length: 4,
         charset: 'numeric'
        });
        
        
        const email=req.body.email
        const existeuser=await user.findOne({email:email})
     
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        if(!existeuser){
            let new_user=new user({
                email:req.body.email,
                role:'Moderateur',
                nom:req.body.nom,
                prenom:req.body.prenom,
                password:hashed
    
             })

             let result= await new_user.save()
             res.status(200).json({resultat:result,message:"Moderateur add avec succes"})

        




        transporter.sendMail({
        from: 'groupe camp',  
  to: email,   
  subject: 'Sending Email using to create  your acount',

  html: `<b>Hey ${req.body.nom } ${req.body.prenom }! </b> 
  <br>welcome to our application <br/>  
  your acount is been created by the admin your mail is : ${req.body.email} and your password is : ${password}`,

},





(err,succes)=>{
    if (err) {
        console.log(err);
        return res.status(400).json(err)
    }else{
        console.log(succes);
        res.status(200).json("your mail has been send to your user ")
    }

})
}else{
    res.status(400).json({message:"Moderateur déja existe"})
}

    } catch (error) {
        console.log(error);
    }
}

exports.motdepasseoblier = async (req, res) => {
    let {
      email
    } = req.body;
  
    let User = await user.findOne({
      email: email
    });
    if (!User) return res.status(404).json("user do not exist");
      let user_secret = passwords
    await user.findOneAndUpdate({
      email: email
    }, {
      passwordHash: user_secret +"" 
     
    });
    console.log(user_secret)
    let inside_token = User.password_last_update.toString() + user_secret + "";
    let reset_token =   jwt.sign({
        _id: User._id,
      },
      inside_token, {
        expiresIn: "1d"
      }
    );
    const token =  jwt.sign({
        _id: User._id,
        token: reset_token,
      },
      secretOrPrivateKey
  
    );
  
    try {
      transporter.sendMail({
          from: "groupe camp",
          to: req.body.email,
          subject: "mot de passe oublier",
          html: `svp  utilisez le lien suivant pour récupérer votre mot de passe: http://localhost:8080/change_password/${token}`,
        },
        (errr, info) => {
          if (errr) {
            console.log(errr);
            return res.status(400).json({
              message: {
                error: errr,
              },
            });
          }
          console.log(info);
          return res.status(200).send("mail envoyer ");
        }
      );
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        message: {
          error: err,
        },
      });
    }
  }
  
  
  exports.verfiertoken = async (req, res) => {
    let token = req.params.token;
    console.log(token)
    try {
      jwt.verify(token,   secretOrPrivateKey);
  
     
      res.status(200).json("token verified avec succes ");
    } catch (error) {
      console.log(error);
      return res.status(401).send("Invalid Token");
    }
  }
  
  exports.changepassword = async (req, res) => {
    const {
      password,
      token
    } = req.body;
    try {
      const verified = jwt.verify(token,   secretOrPrivateKey);
  
     
  
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
  
      await user.findOneAndUpdate({
        _id: verified._id
      },
       {
        password: hashed
      });
      res.sendStatus(200);
    } catch (error) {
      return res.status(401).send("Invalid Token");
    }
  }
  