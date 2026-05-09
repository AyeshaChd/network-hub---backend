const mongoose = require ("mongoose")
const connectionRequestSchemma = new mongoose.Schema({
    fromUserId :
    {
        type : mongoose.Schema.Types.ObjectId,  // gives objectId of user
        required :true
    },
    toUserID:
    {
        type : mongoose.Schema.Types.ObjectId,
         required :true
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
 connectionRequestSchemma.pre("save",function (){
    const connectionRequest=this
   if(connectionRequest.fromUserId.equals(connectionRequest.toUserID))
   {
    throw new Error("you can not  send request to yourself")
   }
 })
 connectionRequestSchemma.index({fromUserId :1 , toUserID:1}) ///index to make query faster
const connectionRequestModel = new mongoose.model("ConnectionRequest" , connectionRequestSchemma)
module.exports =
    connectionRequestModel;
