


const jwt = require("jsonwebtoken")


const asyncHandler = require("express-async-handler")




const verifyToken = asyncHandler ( async ( req , res , next) => {


 // احنا يا معلم بنبعت اكسيس توكين مش ريفريش توكين عشان اكسيس توكين لو اتهكر من الهكر هيكون لية وقت محدد وهو ربع ساعة وساعتها مش هيعرف يعمل حاجة بعد كدة في الموقع لكن ريفريش توكين بيكون متخزن على مدي بعيد وقت اطول يومين اسبوع او 128 يوم ايا كان احنا بنستخدم ريفريش توكين عشان الامان وعشان نخزنوة في داتا بيز ونبعت توكين وهمي  اسمة اكسيس توكين متاح لمدة ربع ساعة نوعا ما من الامان عشان نتجنب الهكر او اختراق موقع وكمان هكر صعب يخترق اكسيس توكين بيكون متخزن في فروند اند داخل متغير يوس ستيت و دة ميموري مش زاي لوكيل ستوريج يكون متخزن واضح كدة وباين على متصفح لكن هكر صعب يوصل لمتغير اكسيس توكين وحتي لو وصلوة هيبقي ربع ساعة مش هيلحق يعمل حاجة في موقع ولا هيلحق يخترقوة فصعب جدا توصل لاكسيس توكين لان هو متخزن داخل يوسيت ويوستيت دة متغير بتتخزن فية قيم بتاعتة داخل ميموري فصعب يوصل لكود بتاعك عشان يجيب اكسيس توكين ولو وصل صعب يعمل اي حاجة لان اكسيس توكين مدتة ربع ساعة فقط 

const accessToken = req.headers.authorization.replace("Bearer " , "").trim()


if(!accessToken) {

return res.status(401).json({ message : "Not authorized, no token provided" })

}


try{

const decode = jwt.verify(accessToken , process.env.Access_Token_Secret)


// بنتأكد من الايدي بتاع مستخدم احنا خزناة في لوجين لما كنا بنعمل اكسيس توكين وبنتأكد من مفتاح سري برضو لو لقي نفس الايدي في هيدر هو هو نفس الايدي في توكين هيسمحلوة بهوية ويعديوة لو مش نفس الهوية والايدي هيضربلك ايرور بتاع كاتش تحت 



req.user = decode.userID // طبعا دة هنستخدموة في كذا راوتيرس ريجوسيت يوسير

// req.user = 6a6cfbf17b29253968ded872 

next ()


}


catch(err) {

console.log("error verify token" || err.message) 
 
 return res.status(401).json({ message : "Expired or invalid refresh token" })

}


})



module.exports = verifyToken




// const verifyToken = asyncHandler (async (req , res , next) => {


// const accessToken = req.headers.authorization.replace("Bearer " , "").trim() 

// if(!accessToken) {


// return res.status(400).json({ message : "No token found" })

// }


// try {

// const decode = jwt.verify(accessToken , process.env.Access_Token_Secret)

// // بنتأكد من الايدي بتاع مستخدم احنا خزناة في لوجين لما كنا بنعمل اكسيس توكين وبنتأكد من مفتاح سري برضو لو لقي نفس الايدي في هيدر هو هو نفس الايدي في توكين هيسمحلوة بهوية ويعديوة لو مش نفس الهوية والايدي هيضربلك ايرور بتاع كاتش تحت 


// req.user = decode // طبعا دة هنستخدموة في كذا راوتيرس ريجوسيت يوسير

// }


// catch(err){

//  return res.status(401).json({ message : "Expired or invalid access token" })

// } 





// })










