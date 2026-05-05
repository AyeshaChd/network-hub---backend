const express = require("express")
const profileRouter =express.Router();
const {userAuth} =require("../middlewares/auth")  
const {validateEditProfileData }= require ("../utils/validation")




// get profile api
profileRouter.get("/profile/view", userAuth , async(req,res)=>
{
    try{
       
        const user= req.user;
        res.send(user);
    
    }
    catch(error)
    {
 res.status(404).send("ERROR" + error.message)
    }
   
})
// api to update  profile
profileRouter.patch("/profile/edit", userAuth,async(req,res)=>
{ try{
    // 1. Validate if the fields in req.body are allowed
   const validEdit = validateEditProfileData(req);
  
   const loggedInUser= req.user
   
 // 2. Update the fields on the user object

    Object.keys(req.body).forEach(key => loggedInUser[key]=req.body[key])
      // 3. Save the document
    // This AUTOMATICALLY runs all schema validations (min/max length, etc.)
    await loggedInUser.save()
   res.json({ message :`${loggedInUser.firstName}, profile updated successfully`
, data : loggedInUser} );
   }

catch(error)
    {
 res.status(400).send("ERROR" + error.message)
    }
    
})
module.exports = profileRouter;