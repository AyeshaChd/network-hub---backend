const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter =express.Router();
const razorpayInstance = require("../utils/razorpay")
const {Payment}=require("../config/models/payment")
const membershipAmount=require("../utils/constants")
const {validateWebhookSignature} = require('razorpay/dist/utils/razorpay-utils');
const { User } = require("../config/models/user");
paymentRouter.post("/payment/create",userAuth,async(req,res)=>
{
   const{membershipType}=req.body
  const{firstName,lastName,emailId}=req.user
  // console.log("razorpayInstance",razorpayInstance)
  try{
  // const order = await  razorpayInstance.orders.create({
  // "amount": membershipAmount[membershipType]* 100,
  // "currency": "INR",
  // "receipt": "receipt#1",
  // // "partial_payment": false,
  // "notes": {
  //   "firstName": firstName,
  //   "lastName": lastName,
  //   "emailId" :emailId,
  //   "premiumType":membershipType
  // }

const order = await razorpayInstance.orders.create({
  amount: membershipAmount[membershipType] * 100, // Clean key
  currency: "INR",                                // Clean key
  receipt: "receipt_1",                           // Clean key (avoid special chars like #)
  notes: {                                        // Clean key
    firstName: firstName,
    lastName: lastName,
    emailId: emailId,
    premiumType: membershipType
  }


  
});

  // save order in db
 

  const payment = new Payment({
    userId:req.user._id,
    orderId:order.id,
    status:order.status,
    amount:order.amount,
    currency:order.currency,
    receipt:order.receipt,
    notes:order.notes,
  })
  const savedPayment = await payment.save()
console.log("Sending Key ID:", process.env.RazorPay_Key_ID);
res.json({...savedPayment.toJSON(),keyId :process.env.RazorPay_Key_ID})



  }
catch(error)
{
console.log("===== FULL ERROR OBJECT =====");
  console.dir(error, { depth: null });

  console.log("MESSAGE:", error);
  console.log("STATUS CODE:", error.statusCode);
  console.log("REASON:", error?.error?.description || error?.description);

  return res.status(500).json({
    message: error.message,
    statusCode: error.statusCode || 500
})
}
})
paymentRouter.post("/payment/webhook",async(req,res)=>
{
  try{
    const webhookSignature=req.get("X-Razorpay-Signature")
  const isWebhookValid =validateWebhookSignature(JSON.stringify(req.body), webhookSignature, process.env.Razorpay_Webhook_secret)
  if( ! isWebhookValid ){
    return res.status(400).json({msg:"Webhook is not valid"})

  }
  // update my payment status in DB
  const paymentDetails= req.body.payload.payment.entity;
  const payment = await Payment.findOne({orderId:paymentDetails.order_id})
  payment.status = paymentDetails.status;
  await payment.save();

  const user = await User.findOne({_id : payment.userId})
  user.isPremium =true,
  user.premiumType = payment.notes.premiumType
  await user.save()
  // if(req.body.event=="payment.captured"){}
  // if(req.body.event=="payment.failed"){}


  //return response to razorpay
   return res.status(200).json({msg:"Webhook received successfully"})


}
  catch(error)
  {
   return res.status(500).json({msg:error.message})
  }
})
module.exports = paymentRouter