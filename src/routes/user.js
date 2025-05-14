const express = require('express');
const router = express.Router();
require("dotenv").config({ path:'../env'});  
const { users,admins , communitys} = require('../db/mndb');
const { userMiddleware , exituserS,exituserL} = require('../middlewares/user_middle');
const jwt = require('jsonwebtoken');
const jwtpassword = process.env.JWT_SECREAT;

const bcrypt = require('bcrypt');
const saltround = 10;
//signup rotes                              
router.post('/signup',exituserS,async (req,res)=>{
try{
    const name = req.body.name;
const id = req.body.id;

const password = req.body.password;
const { university,course} = req.body;
const hasspassword = await bcrypt.hash(password,saltround);
console.log("Original Password:", password);
        console.log("Hashed Password:", hasspassword);
const newuser =await new users({
    name:name,
    id:id,
    password:hasspassword,
    university,
    course
})
await newuser.save();
res.json({ 
    "message": " signed up successgully! go to login",
  
});
}
catch(error){
   res.status(505).send("server error");
     
};
});
// Login routes
router.post('/login',exituserL,(req,res)=>{
 try{
 
    
  const {id , password} = req.body;
  const token = jwt.sign({id:id},jwtpassword,{expiresIn:'1h'});

  res.status(200).header("authorization",`bearer ${token}`).json({ "message": "you are successfully logged in", "token":token});
 }catch(error){
    res.status(404).send("internal server login error");
 }
});

// GET route to fetch all users
router.get('/getstudents', async (req, res) => {
    try {
      const userList = await users.find(); // Fetch all user documents
      res.status(200).json(userList);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  //community
  router.get('/community',async (req,res)=>{
    try{
console.log("reached");
    
    const community_data = await communitys.find();
    console.log(community_data);
    res.json({
      "data":community_data,
      "msg":"sucessfull"
    })
     }catch(erorr){
console.log(error);
res.status(404).json({"msg":"error occured","error":error})
    }
    
  });
  router.post("/postdata",async (req,res)=>{
    try{
      console.log("reached postdata");
      
   const {title,descrip,author,tags} = req.body;
   const singledata = await new communitys({
    title,descrip,author,tags
   })
   await singledata.save();

   res.json({"msg":"succesfully inserted"});
    }catch(error){
    res.status(404).json({"msg":"error at server","error":error})
    }
  })

module.exports = router;