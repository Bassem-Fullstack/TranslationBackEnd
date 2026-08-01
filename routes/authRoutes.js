



const express = require("express") 


const router = express.Router() 


const { register , login , handleRefreshToken , logout } 

 = require("../controllers/authControllers")


 const validate = require("../validation/validate")


 const {registerSchemaJoi , loginSchemaJoi} = require("../validation/JoiSchema")




 router.post("/register" , validate(registerSchemaJoi) , register)


 router.post("/login" , validate(loginSchemaJoi) , login)


 router.get("/refreshToken" , handleRefreshToken )
 

 router.delete("/logout" , logout)


module.exports = router
