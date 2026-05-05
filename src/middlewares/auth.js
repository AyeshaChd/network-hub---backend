
const jwt = require("jsonwebtoken")
const { User } = require("../config/models/user")
const userAuth =  async (req,res,next)=>
{
    try{ 
         //validate the token
   const {token} = req.cookies
  
   if( ! token){ throw new Error ("token is not valid")}
   const decodedMessage= jwt.verify(token,'decTinder@123')
   const {_id} = decodedMessage
   const  user = await User.findById(_id)

   if( ! user){
    throw new error ("user not found")
   }
     req.user=user;
    next();
    }
    catch(err){
     res.status(401).send( "Error while Authentication :"+ err.message)
    }
}


module.exports={userAuth}