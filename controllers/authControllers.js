

const User = require("../models/User") 


const bcryptjs = require("bcryptjs")


const asyncHandler = require("express-async-handler")


const jwt = require("jsonwebtoken") 


const register = asyncHandler(async ( req , res) => {


const { username , email , password } = req.body 



const getUser = await User.findOne({ email : email })

if(getUser) {

 return res.status(400).json({  message : "User is already exist" })

}


const hashPassword = await bcryptjs.hash(password , 10) 



const createUser = await User.create({

username ,

email , 

password : hashPassword

})


res.status(201).json({ 


success : true ,

user : {
 
    _id : createUser._id ,

    username : createUser.username ,

    email : createUser.email 

}


})



})



///////////////////////////////////////////////////////////////////////////////////////////////////////



const login = asyncHandler (async ( req , res) => {



const {email , password} = req.body 


const getUser = await User.findOne({ email : email  })

if(!getUser) {

 return res.status(400).json({ message : "Email or Password are Invalid" })

}




const isMatch = await bcryptjs.compare(password , getUser.password) 

if(!isMatch){

 return res.status(400).json({ message : " Email or Password are Invalid " })

}



const refreshToken = jwt.sign(

  
 { userID : getUser._id } ,

  process.env.Refresh_Token_Secret ,

  {expiresIn : "128d"}
     

)



const accessToken = jwt.sign(

 {userID : getUser._id} ,

  process.env.Access_Token_Secret ,
  
  {expiresIn : "15m"}


)


getUser.refreshToken.push(refreshToken) //   بنخزن ريفريش توكين دائم هنا في داتا بيز بنضيف علية توكين بقولوة ضيفلي توكين في اخر 


await getUser.save ()



res.cookie("refreshToken" , refreshToken , {


httpOnly : true ,

sameSite : "strict" ,

secure : process.env.NODE_ENV === "production" ,

maxAge : 128 * 24 * 60 * 60 * 1000

})


res.status(200).json({ 
    
sucess : true  ,  

accessToken ,

user : {

 _id : getUser._id ,

 email : getUser.email 

}


})



})


////////////////////////////////////////////////////////////////////////////////////////////////


const handleRefreshToken = asyncHandler ( async ( req , res) => {


const getRefreshToken = req.cookies.refreshToken 


if(!getRefreshToken) {

 return res.status(401).json({ message : "No refresh token provided" })

}


const decode = jwt.verify( getRefreshToken , process.env.Refresh_Token_Secret)


// بفك توكين واجيب الايدي متخزن جواة توكين وافكوة واقارنوة بالايدي موجود عندي في داتا بيز لو الايدي سليم ومتخزن عندي تمام خلاص جددلوة توكين بتاعوة اكسيس كل ربع ساعة


const getUser = await User.findById(decode.userID) 


if(!getUser || !getUser.refreshToken.includes(getRefreshToken)) {

return res.status(401).json({ message : "Invalid refresh token, please login again" })
    
// بقولوة لو مستخدم دة مش موجود مش مسجل عندنا عمل ريجيستر وبياناتة اتسجلت في داتا بيز بس معملش لوجين ومش نفس الايدي او مش نفس الايدي اللى جاي من توكين بقولوة روح ارميلي ايرور دة طيب لو هو مسجل عندنا قبل كدة بس توكين بتاعوة اتمسح من داتا بيز بقولوة روح اعمل لوجين عشان نعملك ريفريش توكين جديد بعد ما انت خرجت من تطبيق وعملت لوج اويت ريفريش توكين اتمسح فأكتشف ان توكين في صفحة كوكيز مش نفس توكين متخزن في داتا بيز راح راملوة ايرور قالو روح سجل في لوجين عشان نعملك ريفريش توكين جديد 

// يعني بقولوة مش نفس مستخدم مش نفس الايدي معندناش حد بالاسم دة بقولوة روح على لوجين وسجل في لوجين دة شرط اول لكن الشرط تاني بقارن توكين جاية من كوكيز بتوكين متخزنة في داتا بيز لو مش متخزن عندي في داتا مش نفس توكين روح سجل لوجين وتاخد رفريش توكين هدية

}


// بعد ما اتأكدنا ان ريفريش توكين جاية من كوكيز هي هي نفس ريفريش توكين توكين متخزنة في داتا يعني نفس الايدي بتاع مستخدم بظبط بقولوة خلاص روح جددلي اكسيس توكين بتاعوة كل ربع ساعة لما يخلص متصفح تلقائي بيعمل اكسيس توكين تلقائي ويجددلوة والسبب في فونشين دة بتاع راوتيس ريفريش توكين



const accessTokenAgain = jwt.sign(

 { userID : getUser._id } ,


  process.env.Access_Token_Secret ,


 {expiresIn : "15m"}


)


res.status(200).json({

sucess : true ,

AccessToken : accessTokenAgain // بنبعت بقي لفروند اند الرد بتاعنا اللى هو اكسيس توكين عشان لما مستخدم اكسيس توكين بتاعة يخلص اللى هو مدتة ربع ساعة يبدأ بقي متصفح يجددلوة تلقائي توكين جديد في كوكيز

})


})



/////////////////////////////////////////////////////////////////////////////////////// 



const logout = asyncHandler (async (req , res) => {



const refershToken = req.cookies.refreshToken 


if(refershToken) {



 await User.findOneAndUpdate(

  {refreshToken : refershToken } , // دي قيمة متخزنة في فيليد داتا في ريفريش توكين بنحدد قيمة اولا هنا ثم نحذفها

  { $pull : { refreshToken : refershToken } } // هنا بقي بنحذف توكين كلمة بول يعني حذف وطبعا بقولوة احذفلي توكين واحد فقط يعني ممكن مستخدم يكون فاتح من تليفون او فاتح من كمبيوتر بس خرج من تليفون بس بقولوة احذف توكين بتاع تليفون مستخدم وسيبلوة توكين بتاع جهاز كمبيوتر بتاعوة


 )   

}


res.clearCookie("refreshToken" , {


httpOnly : true ,

sameSite : "strict" ,

secure : process.env.NODE_ENV==="production"


})



res.status(200).json({

success : true ,

message : "Logged out successfully"

})


})










module.exports = { register , login , handleRefreshToken , logout }

























