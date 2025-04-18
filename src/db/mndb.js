require("dotenv").config();
const mongoose = require('mongoose');
// mongodb database connect


const dbconnect = async()=>{
await mongoose.connect(process.env.MONGO_URI).then(()=>{
   
    
    console.log('✅  sucessful connected with mongoodb');
    
})

.catch((err)=>{
   
    console.log("error in connecting with mongoodb");
    
});
}
// schema for user 
const userSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      id: { // This will act like email or unique identifier
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      university: {
        type: String,
        required: false,
      },
      course: {
        type: String,
        required: false,
      },
      
    
});

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      id: { // This will act like email or unique identifier
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      university: {
        type: String,
        required: false,
      },
      course: {
        type: String,
        required: false,
      },
      company:{type:String},
      profilePic: { type: String, default: '' },
      bio: { type: String },
      skills: [String],
});

const users = mongoose.model('student',userSchema);  
const admins = mongoose.model('alumanai',adminSchema);

module.exports = { dbconnect , users, admins} ; 
