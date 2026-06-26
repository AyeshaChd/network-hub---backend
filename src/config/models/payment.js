const mongoose= require("mongoose");
const {User}=require("../models/user")
const paymentSchemma =new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref :"User",
        required:true

    },paymentId:{
        type:String,
    },
    orderId:{
        type:String,
        required:true,
    },
    status :{
         type:String,
        required:true,
    },
    
    amount:{
         type:Number,
        required:true,
    },
    currency:{
         type:String,
        required:true,
    },
    notes:{
        firstName:{
            type:String,
        },
        lastName:{
            type:String,
        },
        membershipType:{
            type:String,
        },
        emailId:{
        type:String,
    },
    },
   


},{   timestamps:true,})
const Payment =mongoose.model("Payment" , paymentSchemma)
module.exports={Payment};