require('dotenv').config({ path: '../.env' });

const cors = require('cors');
const express = require('express');
const http = require('http');
const {Server} = require("socket.io") ;
const app = express();
const server  = http.createServer(app);  
const port =  process.env.PORT || 3000;
const {dbconnect } = require('./db/mndb');
const  userroute  = require('./routes/user');
const adminroute = require('./routes/admin');
const communityroute = require("./routes/community");
// db connection 
dbconnect();
// middlewares
app.use(cors());
app.use(express.json());
// routes
app.use("/user",userroute);
app.use('/admin',adminroute);
app.use('/community',communityroute);
///
const io= new Server(server ,{
    cors: {
      // origin: "http://localhost:5173/", // ✅ frontend URL
      origin: ["https://m-connect-ten.vercel.app/","http://localhost:5173/"],
      methods: ["GET", "POST"]
    }
  });
///
const socketdata = new Map();
io.on("connection",(socket)=>{
console.log("user connected to socket");
console.log("id",socket.id);
 socket.on("register",(alumni)=>{
   socketdata.set(alumni,socket.id);
   console.log(`User ${alumni} registered with socket ${socket.id}`);
 })
socket.on("message",({message,senderid,receiverid})=>{
    console.log(`i got this message${message}`);
const receiversocketid = socketdata.get(receiverid);

io.to(receiversocketid).emit("received message" , `${message}`);
})
socket.on("disconnect",()=>{
  for (let [userId, sockId] of socketdata.entries()) {
    if (sockId === socket.id) {
      socketdata.delete(userId);
      console.log(`User ${userId} disconnected`);
      break;
    }
  }
    console.log(`${socket.id} disconnected`);
    
}); 
})

server.listen(port,()=>{
    console.log(`🚀 port running on ${port}`);
}); 
