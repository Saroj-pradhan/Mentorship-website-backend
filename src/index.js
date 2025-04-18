require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();
const cors = require('cors');

const port =  process.env.PORT || 3000;
console.log( process.env.PORT);

const {dbconnect } = require('./db/mndb');
const  userroute  = require('./routes/user');
const adminroute = require('./routes/admin');
// db connection 
dbconnect();
// middlewares
app.use(cors());
app.use(express.json());
// routes
app.use("/user",userroute);
app.use('/admin',adminroute);
app.listen(port,()=>{
    console.log(`🚀 port running on ${port}`);
}); 
