const Razorpay = require("razorpay")

var instance = new Razorpay({
  key_id: process.env.RazorPay_Key_ID ,
  key_secret: process.env.RazorPay_Key_Secret,
});

module.exports = instance