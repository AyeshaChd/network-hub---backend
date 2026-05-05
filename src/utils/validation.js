const  validator = require("validator")

const validateSignUpData =(req)=>
{
const{firstName , lastName , password, emailId} = req.body;
if( !firstName || !lastName){
    throw new Error("Name is not valid!")
}
else if(firstName.length < 4 || firstName.length > 50){
    throw new Error ("first name should be between 4 and 50 characters");
}
else if(lastName.length < 4 || lastName.length > 50){
    throw new Error ("first name should be between 4 and 50 characters");
}
else if(! validator.isEmail(emailId))
        {throw new Error("email is not valid!")}
    
else if(! validator.isStrongPassword(password))
{
   throw new Error("password is not strong!")
    
}


}

const validateEditProfileData=(req)=>
{
    
    const allowedDataForEdit =["firstName","lastName","emailId","about" ,"age" ,"gender" ,"photoUrl","skills"]
   const isAllowed= Object.keys(req.body).every(field => allowedDataForEdit.includes(field)) // keys or field are the filds in request object
   if(! isAllowed){
throw new Error ("invalid Edit Request")
   }
   
 return true
 
}

  

   



module.exports = { validateSignUpData ,validateEditProfileData
}