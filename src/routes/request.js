const express = require("express")
const requestRouter = express.Router();
const ConnectionRequest = require("../config/models/connectionRequest")

const {userAuth} =require("../middlewares/auth");  
const { User } = require("../config/models/user");
 const sendEmail= require("../utils/sendEmail")
requestRouter.post("/request/send/:status/:toUserID", userAuth,async(req,res)=> //  /: status is use for dynamic it can be either interested or ignored
{ 
    try{
   
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
// validating either the connection request is already exist or not 
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
    const sendRes = await sendEmail.run("A new friend Request from " + user.firstName,user.firstName + "  is   "+ status+ "in"+ "you")
   console.log(sendRes)
   if(status === "interested"){
   return res.json({
        message : user.firstName + " , request has been sent succesfully",data
    })
}
return res.json({
        message : user.firstName + " , request has been ignored succesfully",data
    })

}
  
catch(error)
{
  res.status(400).send("Error while request :"+ error.message)
}
}
)

requestRouter.post("/request/review/:status/:requestID",userAuth,async(req,res )=>
{try{
    const loggedInUser= req.user;
    const allowedStatus =["accepted","rejected"]
    const status = req.params.status;
    const requestID=req.params.requestID
    
   
    if( ! allowedStatus.includes(status))
    {
        res.status(400).json({
            message: status + " status is not allowed!"
        })
    }
    const connectionRequest= await ConnectionRequest.findOne({
        _id : requestID,
       
        toUserID:loggedInUser._id,
        status : "interested",

    })
    
    if( ! connectionRequest)
    {
        res.status(404).send("connection request does not found")
    }
    
     connectionRequest.status = status // updating the interested status in DB with status in req url

     await connectionRequest.save();
     res.send(`request has been ${status} successfully`)
   


}
catch(error)
{
    res.status(400).send("Error :"+ error.message)
}
})
module.exports = requestRouter