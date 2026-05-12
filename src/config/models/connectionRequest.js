const mongoose = require ("mongoose")
const {User}=require("../models/user")
const connectionRequestSchema = new mongoose.Schema({
    fromUserId :
    {
        type : mongoose.Schema.Types.ObjectId,  // gives objectId of user
        required :true,
        ref : "User"
    },
    toUserID:
    {
        type : mongoose.Schema.Types.ObjectId,
         required :true,
           ref : "User"
    },
    status:
    {
        type : "String",
         required :true,
        enum :{  // enum means which values will be accepted
            values : ["interested","ignored","accepted","rejected"],
            messagge : `{VALUE} is incorrect status type`
        }

    }
    
    },
    {
        timestamps :true ,
    }
)
 connectionRequestSchema.pre("save",  function (){
    const connectionRequest=this
   if(connectionRequest.fromUserId.equals(connectionRequest.toUserID))
   {
    throw new Error("you can not  send request to yourself")
   }
   
 })
 connectionRequestSchema.index({fromUserId :1 , toUserID:1}) ///index to make query faster
const connectionRequestModel = new mongoose.model("ConnectionRequest" , connectionRequestSchema)
module.exports =
    connectionRequestModel;
