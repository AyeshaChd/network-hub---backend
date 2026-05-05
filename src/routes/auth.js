const express= require("express")
const authRouter = express.Router();
const {validateSignUpData}=require("../utils/validation")
const bcrypt = require("bcrypt");
const {userAuth} =require("../middlewares/auth") 
const {User}= require("../config/models/user")
authRouter.post("/signup",async(req,res)=>
{   
try{
    // validation of data
    validateSignUpData(req)
const {password ,firstName ,lastName,emailId} =req.body
    // encryption of password

    const passwordHash =  await bcrypt.hash(password,saltrounds =10);
     
    //creating an instance of user model

    const user =  new User( 
         {   firstName,lastName ,emailId, password : passwordHash} 
        
);

   // saving this instance to db
   await user.save();
   res.send("user added succesfully");
}
catch(err)
{
    res.status(404).send("Error : "+ err.message);
}
})
// creating login api
authRouter.post("/login",async(req,res)=>
{
    try{
        const {emailId,password}= req.body
       
        const user =  await User.findOne({emailId :emailId})
      
        if(! user)
        {  
            throw new Error("invalid credentials")
        }
     
        const  isvalidPassword = user.validPassword(password)
        if(! isvalidPassword)
        {
            throw new Error("invalid credentials") 
        }
        if(isvalidPassword)

        {
            // create a JWT token
           const token = await user.getJWT();
           console.log("token wile sent :"+token)
            res.cookie("token",token,{expires: new Date( Date.now()+ 8 * 3600000)});
            res.send ("login Successfully")
        }

    
 
    }  
    catch(err)
    {
        res.status(404).send("error"+ err.message)
    }
})
// creatin ga logout api
authRouter.post("/logout",async(req,res)=>
{
 console.log("logout")
    res.cookie("token", null ,{
        expires : new Date (Date.now())
    })
   
    res.send("logout successfully")
})
module.exports = authRouter;