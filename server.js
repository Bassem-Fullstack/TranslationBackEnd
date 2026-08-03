

const dotenv = require("dotenv")

dotenv.config()

const express = require("express") 

const app = express()

const cookiesParser = require("cookie-parser")

const userRouters = require("./routes/authRoutes")

const geminiRouters = require("./routes/geminiAIRoutes")

const transaltionRouters = require("./routes/translationRoutes")

const cors = require("cors")

const PORT = process.env.PORT || 5000 


const connected = require("./config/db")


await connected();

app.use(express.json())

app.use(cookiesParser())


app.use(cors({

origin : (origin , callback) => {


if(!origin || origin === "http://localhost:3000" || /\.vercel\.app$/.test(origin)){


callback(null , true)

}

else{

callback(new Error("Not allowed by CORS"))

}

} ,

credentials : true // عشان خاطر نعرف نبعت كوكيز للفروند اند من غير سطر دة مش هنعرف نبعت كوكيز للفروند اند عادي بدون اي مشاكل

}))




app.get("/" , (req , res) => {


res.status(200).send("server is working well")

})


//////////////////////////////////////////////////////////////////////////// 

app.use("/api/users" , userRouters )


/////////////////////////////////////////////////////////////////////////////////////// 


app.use("/api/gemini" , geminiRouters)


////////////////////////////////////////////////////////////////////////////

app.use("/api/translation" , transaltionRouters)


app.listen(PORT , () => {

console.log("server is working") 

})


















