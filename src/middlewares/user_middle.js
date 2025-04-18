const express = require('express');
const { users } = require('../db/mndb');
const jwt = require('jsonwebtoken');
const jwtverifypass = process.env.JWT_SECREAT;

const bcrypt = require('bcrypt');
const saltround =10;
function userMiddleware(req,res,next){
try {
  const {token } = req.headers;

const vfytoken = token.split(" ")[1];
jwt.verify(vfytoken,jwtverifypass,(err,decode)=>{  
  if(err){
  return  res.status(404).send("error at token verification")
  }
  next();
})
} catch (error) {
  console.log(error);
  res.status(505).send("error at adminacess through token");
}

}
//user verification for signup
async function exituserS(req,res,next){
    try{
     const id = req.body.id;
     const ans =await users.findOne({ id:id});
     if(ans == null){
       return  next();
     }
     res.status(400).json({"message":"user  already exits please Login"});
    }
    catch(error){
   
   res.status(404).send("server error");
    }
}
//user verification for login
async function exituserL(req,res,next){
 try{
    
 const { id ,password} = req.body; 
 

 
   const user = await users.findOne({ id:id});
   if(user == null){
   return res.status(404).send('invailed user id , try another or signup with this id');
   }
   const hassedpassword = await bcrypt.compare(password,user.password);
  
   if(hassedpassword){
    return next();
   
   }
     res.status(404).send("invailed password");

   
   
 }catch(error){
  
   res.status(404).send("server error");
 }
}

module.exports = { userMiddleware , exituserS, exituserL};