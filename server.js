const express=require("express")
const app=express()
const database=require("./db/db")
 const bodyParser = require('body-parser')
const user=require("./models/users")
const mongoose=require('mongoose')
const categoryroute=require("./routes/routecategory")
const placerouter=require("./routes/routerplace")
const userrouter=require("./routes/routeruser")
const raterouter=require('./routes/raterouter')
const path=require("path")
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
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
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