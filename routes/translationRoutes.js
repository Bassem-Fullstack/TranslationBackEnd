



const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth");

const {

 removeTransaltion  , getAllTransaltion

} = require("../controllers/translationController");

router.get("/", verifyToken, getAllTransaltion);

router.delete("/:id", verifyToken, removeTransaltion);

module.exports = router;




