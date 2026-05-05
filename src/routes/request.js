const express = require("express")
const requestRouter = express.Router();

const {userAuth} =require("../middlewares/auth")  
requestRouter.post("/sendRequest", userAuth,(req,res)=>
{
    const user= request .user;
    res.send(user.firstName + "  sent the connection request")

})
module.exports = requestRouter