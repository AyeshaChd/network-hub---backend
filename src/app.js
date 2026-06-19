const express = require("express");
const app=express();
require("./config/database");
const {connectDB }=require("./config/database")
const {User}= require("./config/models/user")


const cookieParser = require("cookie-parser");
const jwt=require("jsonwebtoken")
const {userAuth} =require("./middlewares/auth")  
const cors = require('cors')



// adding middleware to convert json into object
app.use(cors({ origin : "http://localhost:5173", credentials : true}))

app.use(express.json());
app.use(cookieParser())

// importing the routes
const authRouter = require("./routes/auth")
const profileRouter= require("./routes/profile")
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

 // using the routes

 app.use("/", authRouter)
 app.use("/", profileRouter)
 app.use("/", requestRouter)
 app.use("/",userRouter)




 
 


// // creating  a get api to read data from db by id
// app.get("/user", async ( req,res)=>
// {
//     const userName = req.body.firstName;
   
// try{

//        const users =  await User.findOne({firstName: userName})
//        if(users.length === 0)
//        {
//         res.status(404).send("user not found")
//        }
//       res.send(users)
// }
// catch (err){
//     res.status(400).send("Something went wrong");
// }
// })
// // creating a get api to get all the users for feed
// app.get("/feed",async(req,res)=>
// {
//     try {
//         const users=await User.find({});
//         res.send(users);
  

  
//     }
//     catch(error)
//     {
//         res.status(404).send("something went wrong")
        
//     }
// })

// // creating an api to update the user
// app.patch("/user/:userId", async(req,res)=>
// {
//      const userId= req.params?.userId
   
//     const data= req.body;


//     try{
//         const ALLOWED_UPDATES =[
//          "photoUrl","about","age","gender","skills"
//         ]
//         const isUpdateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k))
//         if(!isUpdateAllowed)
//         {
//             throw new Error("update failed ,some fields are not allowed to update")
//         }
//         const user = await User.findByIdAndUpdate({ _id :userId},data,{returnDocument:"before",runValidators:true})
        
        
//         console.log(user);
//         res.send("updated successfully")
//     }
//     catch(error)
//     {
//         res.status(404).send("something went wrong" + error.message)
//     }
// })

 




connectDB()
// managing happy case when got result
.then(()=>
{
    console.log("succesfully connected to db");
    // server is listening
    app.listen(3000,()=>

{
    console.log("server is listening on port 3000");
})
})
// managing bad case
.catch((error)=>
{
    console.log("could not be connected /establised to db");
})


module.exports={app}
