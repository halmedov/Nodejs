const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()
const mongo_url = process.env.MONGOOSE_URL 


const db = () =>{
  mongoose.connect(mongo_url,{
    useNewUrlParser : true,
    useUnifiedTopology: true
  }).then(()=>{
    console.log("MongoDB connected...")
  }).catch((err) =>{
    console.log(err);
  })
}

module.exports = db