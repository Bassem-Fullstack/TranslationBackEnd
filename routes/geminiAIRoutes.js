

const express = require("express")


const router = express.Router()


const translateText = require("../controllers/geminiController")


const verifyToken = require("../middleware/auth")



router.post("/translate" , verifyToken , translateText)




module.exports = router

