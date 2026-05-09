const express = require("express")
const requestRouter = express.Router();
const ConnectionRequest = require("../config/models/connectionRequest")

const {userAuth} =require("../middlewares/auth");  
const { User } = require("../config/models/user");
requestRouter.post("/request/send/:status/:toUserID", userAuth,async(req,res)=> //  /: is use for dynamic 
{ try{
   
    const user= req.user;

    const fromUserId = user._id;
   
    const toUserID = req.params.toUserID // params are paramters in req url (dynamic)
 
    const status= req.params.status
    const allowedStatus =["interested","ignored"]
    if( ! allowedStatus.includes(status))
    {
        return res.status(404).send("invalid status type :" + status)
    }
    const existingUser = await  User.findById(toUserID)
    if( ! existingUser)
    { 
        console.log("user not exist")
          throw new Error ("User does not exist!");
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
        $or : [{fromUserId,toUserID},{fromUserId:toUserID ,toUserID:fromUserId}]
    })
     if(existingConnectionRequest)
     {
        return  res.status(404).send({
            message :"connection request  already exist"
        })
     }

    const connectionRequest = new ConnectionRequest(
        {
           fromUserId,
    toUserID ,
    status,
        }
    )
   const data= await connectionRequest.save()
    res.json({
        message : user.firstName + " , request has been "+ status+" succesfully",data
    })

}
catch(error)
{
  res.status(400).send("Error while request :"+ error.message)
}}
)
module.exports = requestRouter