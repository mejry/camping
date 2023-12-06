const express=require("express")
const app=express()
const database=require("./db/db")
 const bodyParser = require('body-parser')
const user=require("./models/users")
const mongoose=require('mongoose')
const categoryroute=require("./routes/routecategory")
const placerouter=require("./routes/routerplace")
const place =require("./models/Place")
const userrouter=require("./routes/routeruser")
const raterouter=require('./routes/raterouter')
const contacrouter=require("./routes/contactrouter")
const path=require("path")
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser());

app.set("view engine","ejs")
 app.use(express.json())
database()
app.use('/upload', express.static('upload'))
app.use('/category', express.static('category'))
app.use("/category",categoryroute)
app.use("/place",placerouter)
app.use("/user",userrouter)
app.use("/rate",raterouter)
app.use("/contact",contacrouter)
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", " ,content-type");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  
  next();
 
});

io.on('connection',socket=>{
 
   socket.on("data",data=>{
    socket.emit("notif",data)
    })
    

})

app.get("/",(req,res)=>{
    const response =Math.floor( Math.random() * (9999 - 1000) + 1000)
        console.log( response );
        res.json(response)
})


const port=5000

server.listen(port,console.log("server is runing at 5000"))