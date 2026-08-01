





const mongoose = require("mongoose")



const connected = async() => {


try{

await mongoose.connect(process.env.DB_URL)

console.log("mongoDB Connected")

}


catch(err) {

console.log(err.message || "mongoDB doesn't connect it")

}


}



module.exports = connected




