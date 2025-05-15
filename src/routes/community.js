const express = require("express");
const route = express.Router();
const {communitys}  = require("../db/mndb");
 route.get('/getpost',async (req,res)=>{
    try{  
    const community_data = await communitys.find();
    res.json({
      "data":community_data,
      "msg":"sucessfull"
    }) 
     }catch(error){
res.status(404).json({"msg":"error occured","error":error})
    }
     
  });
  route.post("/postdata",async (req,res)=>{
    try{
   const {title,descrip,author,tags} = req.body;
   const singledata = await new communitys({
    title,
    descrip,
    author,
    tags 
   })
   await singledata.save();

   res.json({"msg":"succesfully inserted"}); 
    }catch(error){
      console.log(error);
      
    res.status(404).json({"msg":"error at server","error":error})
    }
  })
module.exports = route;