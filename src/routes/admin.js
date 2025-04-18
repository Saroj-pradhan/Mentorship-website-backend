require("dotenv").config();
const express = require('express');
const route = express.Router();
const { exitadmin , verifytoken} = require("../middlewares/admin_middle");
const jwt = require("jsonwebtoken");
const jwtpassword = process.env.JWT_SECREAT;
const{ admins } = require("../db/mndb")

route.post('/signup',async(req,res)=>{
    
    
    try{
    const {name,id , password,course,university }= req.body;
    const isadmin =await admins.findOne({id:id});
    if(isadmin != null){
      return  res.send("admin lready exist , go to login")
    }
   const newadmin =await new admins({name:name,id:id,password:password,course,university});
   newadmin.save();
   res.status(200).send("admin succesfully signed up ");
    }catch(error){
    res.status(404).send("internal error");
    }
}) 

route.post('/login',exitadmin,(req,res)=>{
    
    
    const {id , password }= req.body;
    const token = jwt.sign({id:id},jwtpassword);
    console.log(token);
    res.status(200).header({'Authorization':`bearer ${token}`}).json({
        "token":`bearer ${token}`,
        "message": "you sucessfully logged in"
    }) 
    
});

route.get('/getadmins', async (req, res) => {
    try {
      const adminList = await admins.find(); // Fetch all admin documents
      res.status(200).json(adminList);
    } catch (error) {
      console.error('Error fetching admins:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = route;