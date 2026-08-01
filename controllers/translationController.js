

const Transaltion = require("../models/Translation")

const asyncHandler = require("express-async-handler")



const getAllTransaltion = asyncHandler(async (req ,res) => {


const getTransaltion = await Transaltion.find({ userId : req.user }).sort({createdAt : -1})



// req.user = decode.userID // طبعا دة هنستخدموة في كذا راوتيرس ريجوسيت يوسير

// req.user = 6a6cfbf17b29253968ded872 دة بيساوي ايدي بتاع مستخدم


res.status(200).json({

 success : true ,
 
 getTransaltion

})

})





/////////////////////////////////////////////////////////////////////////////////////////////////////////// 



const removeTransaltion = asyncHandler (async ( req , res ) => {



const {id} = req.params 


const getTransaltion = await Transaltion.findById(id)


if (!getTransaltion) {

  return res.status(404).json({ message: "Translation not found" });

  }


  await getTransaltion.deleteOne()

  res.status(200).json({

  
    success : true ,

    message: "Translation deleted",


  })




})




module.exports = {  removeTransaltion  , getAllTransaltion }


























