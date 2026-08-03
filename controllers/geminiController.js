



const {GoogleGenerativeAI} = require("@google/generative-ai")

// بنستدعي باكجيج دة بتاع جوجل جيمينجاي وبنستدعي جوااها كلاس اوبجكيت اللى جواة اللى هو اسمة جوجل جيرنيتفاي عشان نستخدموة في مشروعنا هو دة مترجم هيترجملنا الترجمة بتاع مشروع


const asyncHandler = require("express-async-handler")


// طبعا في اكتر من كلاس اوبجكيت داخل باكجيج دة عشان كدة اختارناة دة كلاس دة وظيفتوة بيتعامل مع نصوص والصور وهو هيفيدنا في ترجمة ونتعامل بة هو دة ربط هنربطوة وهو دة برضو هيساعدنا في ترجمة ويترجم اي كلمة مستخدم كتبها انت بس كل عليك تربطوة وتكتبلوة بروميت عايزوة يعمل اية توصفلوة يعمل اية فقط بس دة هتستخدمو  في كذا مشروع كدة

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// ربطنا مفتاح ايباي بتاعنا بمشروع وكدة بقي نبدأ نستخدم فونشين بتاعنا ونخلية يترجملنا


const Transaltion = require("../models/Translation")



const translateText = asyncHandler ( async ( req , res) => {


const { text , sourceLanguage , targetLanguage } = req.body 

// دة النص مستخدم هيكتبوة و دة لغة كاتب بيها كلمة وعايز يترجمها و دة تارجت لانجوس اللى هو لغة مستهدفة اللى عايز يترجمها مستخدم عايز يترجم من عربي لانجليزي عربي دة سورس لانجويس وتارجت لانجوس دة اللى هو الانجليزي


if( !text || !targetLanguage ) {

 return res.status(400).json({ message : "Text and target language are required" })

}



const model = genAI.getGenerativeModel({ model : "gemini-3.5-flash-lite" })

// بقولوة هنا اشتغل على اسرع موديل عندك بحيث ترد على مستخدم بسرعة لما يجي يترجم يعني تترجملوة كلمة بسرعة متبقاش بطيئ عشان كدة استخدمت موديل فلاش اسرع حاجة بدل ما المستخدم يقعد ينتظر كتير


const prompt = sourceLanguage 

? `Transalte the following text from ${sourceLanguage} to ${targetLanguage} : ${text}` 

: `Detect the language of the text and translated it into ${targetLanguage} : ${text}` 


// prompt دة اهم حاجة دة بقي وصف المهمة بتطلبها من ذكاء اصطناعي يعملوة دة هستخدموة في كذا مشروع تحددلوة دورة ومهمتة اية في موقع بقولوة فوق لو سورس لانجيوس لو مستخدم عايز يترجم جملة او كلمة بلغة معينة واختار لغة بتاعتوة ولغة هيترجمها للغة تانية نفذلي شرط دة طيب في حالة مختارش لغة بتاعتة اللى عايز ترجمها وكتب بس نص كدة على طول تلقائي اعرف نص تبع انهي لغة وحولهالوة للغة مستهدفة في ترجمة اللى هو عايز يترجمها في حالة هو مححدش لغة بتاعت كلمة دي روح انت ترجمهالوة على طول وقولوة دي كلمة معناها كذا 


const additionalPrompt = "Just return the translated text. Do not additional descriptions "


// بقولوة متهبدش وتضيف كلام من عندك وتوصف وتقعد ترغي مع مستخدم ترجملوة على طول ومترغيش معاة وتتدخلوة في تفاصيل قولوة انا بترجم فقط


const result = await model.generateContent( prompt + additionalPrompt ) 

// بقولوة خد محتوي بتاع بروميت ونفذهولوة هو وادينشيل طبعا انت بتكلم موقع بتاع جوجل جيمنياي بتكلم موقع برة عشان كدة دة بروميس وعد استخدمت اويت هنا


const translation = result.response.text() // دة الرد اللى جالك من سيرفر بتاع جيمناي و دة ثابت كود دة ريسبنس تيكيت لان احنا عايز نص رجع فقط مش عايزين اي تفاصيل تانية لان هو بيرجع فونشينات كولس وفيدباك وحاجات كتيرة واحنا عايزين تيكست فقط


// هنخزن بقي اللى مستخدم دخلوة في داتا بيز وبالنسبة صفحة تانية هتكون عبارة عن دالتين دالة للمستخدم يشوف فية كل ترجمات بتاعتوة و دالة مستخدم يحب يحذف فية ترجمات لو عايز


const saveTransaltion = await Transaltion.create({


 userId : req.user , 
 
//  req.user = 6a6cfbf17b29253968ded872 

 sourceLanguage : sourceLanguage  || "auto" , // عشان لو مستخدم مكتبش حاجة تخزن قيمة على طول دي ديفلوت اويتو مش يخزنلي سترينج فاضي "" علامتين تنصيص فاضي 

 targetLanguage : targetLanguage ,

 sourceText : text ,

 translatedText : translation

})


res.status(200).json({

 success : true ,
 
 saveTransaltion 

})


})



module.exports = translateText






