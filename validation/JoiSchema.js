



 const Joi = require("joi") 




 const registerSchemaJoi = Joi.object({

username : Joi.string().required().min(3).max(30).trim().messages({


 "string.empty" : "Username is required and can't be empty" , 
 
  "string.min" : "Username must be at least 3 charcters long" ,

   "string.max" : "Username must be 30 charcters long not more" ,

   "any.required" : "Username is required"

}) ,


email : Joi.string().email().required().trim().messages({

 
  "string.empty" : "Email must not be empty." ,
  
   "string.email" : "Please enter a valid email address." ,

    "any.required" : "Email is required." 

}) ,


password : Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)

.min(8)

.required()

.trim()

.messages({

"string.empty" : "Password must not be empty." , 

"string.pattern.base" : "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (@$!%*?&)" ,

"any.required" : "Password must not be empty."

})

})


////////////////////////////////////////////////////////////////////////////////////////


const loginSchemaJoi = Joi.object({


email : Joi.string().email().required().trim().messages({


"string.empty" : "Email must not be empty." ,


"string.email" : "Please enter a valid email address." , 


"any.required" : "Email must not be empty" 

}),


password : Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)

.min(8)

.required(true)

.trim(true)

.messages({

"string.empty" : "Password must not be empty" ,


"string.pattern.base" : "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (@$!%*?&)" ,


"any.required" : "Password must not be empty"


})

})


module.exports = {registerSchemaJoi , loginSchemaJoi}













