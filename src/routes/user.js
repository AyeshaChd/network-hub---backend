const express= require("express")
const userRouter = express.Router();
const {userAuth}=require("../middlewares/auth")
const ConnectionRequest = require("../config/models/connectionRequest");
const { User } = require("../config/models/user");
const User_Safe_Data = "firstName lastName photoUrl age gender about  _id"
// all the pending requests
userRouter.get("/user/requests/received",userAuth ,async(req,res)=>
{
    try{
        const loggedInUser=req.user
        const connectionRequest= await ConnectionRequest.find({
            toUserID :loggedInUser._id,
            status :"interested"

  
        }).populate("fromUserId",["firstName","lastName","photoUrl","age","gender","about","_id"])
       const data=connectionRequest.map(row => ({  // row means object
        requestId: row._id,
        fromUserId:row.fromUserId,
         status: row.status,
         sentAt:row.createdAt  
       }))
 

 
    res.json({
        message: "Data fetched successfully",
        data 

    })
        

    }
    catch(error)
    {
      res.status(400).send("Error :"+ error.message)
    }
}

)
userRouter.get("/user/connections",userAuth,async(req,res)=>
{
    try{
        const loggedInUser =req.user;
        const connectionRequests= await ConnectionRequest.find({
            $or : [{
            toUserID:loggedInUser._id , status:"accepted"
            },{ fromUserId :loggedInUser._id,status:"accepted"}]
        }).populate("fromUserId",User_Safe_Data).populate("toUserID",User_Safe_Data)
     
        const data =connectionRequests.map(row => {if(row.fromUserId._id.toString()=== loggedInUser._id.toString()){
            return row.toUserID;
        }
        return row.fromUserId;
    }
    )
       res.json({
        meassage :"data fetched succesfully",
        data
       })
       
    }
    catch(error)
    {

    }
})
userRouter.get("/user/feed",userAuth,async(req,res)=>
{   

    try{
        const loggedInUser = req.user
        const page = parseInt(req.query.page )|| 1
       
       
        let limit = parseInt(req.query.limit) || 10
        limit = limit>50 ? 50 : limit
         const skip =(page - 1) * limit
        //fetching user' sent + received request
        const connectionRequest = await ConnectionRequest.find({
            $or : [{
                fromUserId:loggedInUser._id
            },{toUserID:loggedInUser._id}]
        }).select("fromUserId toUserID")
       // filtering unique ids
       const hideUsersFromFeed = new Set();
        connectionRequest.forEach(req =>
       {
       
        hideUsersFromFeed.add(req.fromUserId.toString())  // object id is to change to string
       
        hideUsersFromFeed.add(req.toUserID.toString())

       }

)
    const users = await User.find({
        $and  : 
        [
            { _id : {$nin : Array.from(hideUsersFromFeed)}},
            { _id : { $ne :loggedInUser._id}}]
    }).select(User_Safe_Data).skip(skip).limit(limit)
    console.log(users)
    res.send(users)




    }
    catch(error)
    {
res.status(400).send("Error : "+ error.message)
    } 
})
module.exports=userRouter