const cron = require("node-cron")
const {subDays,startOfDay,endOfDay}= require("date-fns")
const  connectionRequestModel = require("../config/models/connectionRequest")
const sendEmail = require("./sendEmail")
cron.schedule("0 8 * * *",async()=>
    
{    
    const yesterday=subDays(new Date(),1)
    const yesterdayStart=startOfDay(yesterday)
    const yesterdayEnd= endOfDay(yesterday)
   // send email at every 8 am   
   try{

      const pendingRequests = await connectionRequestModel.find({
        status : "interested",
        createdAt:{
            $gte : yesterdayStart,
            $lt : yesterdayEnd,
        }
      }).populate("fromUserId toUserID")
      const listOfEmails= [
         ... new Set(pendingRequests.map((req)=>req.toUserID.emailId ))
      ]
      for(const email of listOfEmails)
      {
        try{
        const res= await sendEmail.run("New Friend Request pending for   " + email,"There are so many friend requests pending ,please login to devTinder and accept them")
        console.log("email sent")
        }
        catch(error)
        {
            console.log(error)
        }

      }
      
    //   console.log("res",pendingRequests)

   }
   catch(error)
   {
 console.log(error)
   }
})