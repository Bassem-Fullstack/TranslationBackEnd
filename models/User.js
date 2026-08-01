


const mongoose = require("mongoose")


const userSchema =  new mongoose.Schema({


username : {

 type : String ,

  required : true ,
  
  trim : true 


} ,


email : {

type : String ,

required : true ,

trim : true ,

unique : true 

} ,


password : {

 type : String ,
 
 required : true , 

 minlength : 8 ,

 trim : true 

} ,


refreshToken : [

  {
   type  : String 

  }

]



} , {timestamps : true } )


module.exports = mongoose.model("User" , userSchema)

















