

const mongoose = require("mongoose")


const translationSchema = new mongoose.Schema({


userId : {

type : mongoose.Schema.Types.ObjectId ,

ref : "User" ,

required : true 

} ,


sourceLanguage : {

 type : String ,

 default : "auto" // دة اوبشين اختياري ممكن يترجم كلمة من ما مستخدم يكتب اصل لغة دي كاتبها سواء حدد لغة او محددتش ديفلوت بتاعة اويتو تلقائي

} ,


targetLanguage :  {

type : String ,

required : true 

} ,


sourceText : {

 type : String ,

 required : true

} ,


translatedText : {

type : String ,

required : true 

}


} , {timestamps : true}

)



module.exports = mongoose.model("TranslationUser" , translationSchema) 











