const mongoose= require("mongoose");
const validator=require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userSchemma=  new mongoose.Schema({
    firstName : {
        type: String,
         required:true,
         maxlength:15,
       
    },
    lastName : {
        type: String,
        maxlength:15,
    },
    emailId :
    {
        type:String,
        unique:true, 
        lowercase: true,
        trim :true,
        required:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("email is not valid " + value)
            }
        }
       
    },
    password :
    {
        type : String,
        required :true,
         validate(value)
        {
            if(!validator.isStrongPassword(value))
            {
                throw new Error("Password is not strong " + value);
            }
        }
        
    },
    phoneNo :
    {
        type:Number,
        min:11,
        max:11
    },
    age :
    {
        type : Number,
        min:18,

    },
    gender :
    {
        type : String,
        validate(value)
        {
            if( !["male","female","others"].includes(value))
            {
                throw new Error ("gender is not valid");
            }
        }
    },
    photoUrl :
    {
        type : String,
         validate(value)
        {
            if(!validator.isURL(value))
            {
                throw new Error("Photo url is not valid")+ value;
            }
        }
    },
    about :{
      type: String,
      default : "this is the default of about",
    },
    skills :
    {
        type : [String],  
    }
},{
    timestamps:true,
})


userSchemma.methods.getJWT= async function() // if we will use here an arrow function then it will break
// bcz 'this' keyword does not work in arrow function
{
    const user= this
  const token =   jwt.sign({ _id: user._id }, 'decTinder@123',{expiresIn: "7d"});
 
        return token
           
}
userSchemma.methods.validPassword= async function(passwordInputByUser)
{   
    const user= this
    const passwordHash=user.password;
    const isvalidPassword =   await bcrypt.compare(passwordInputByUser , passwordHash)
      return isvalidPassword 
}
const User =mongoose.model("User" , userSchemma)
module.exports={User};