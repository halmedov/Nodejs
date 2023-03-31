const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors")
const bodyParser = require("body-parser");
const dotenv = require("dotenv")
const db = require("./config/db")
const Auth = require("./routes/auth")
const Post = require("./routes/post")
const app = express()
app.use(cors())

dotenv.config()

const PORT = process.env.PORT || 5050;
db()

app.use(express.urlencoded({ limit : "30mb" ,extended : true}))
app.use(express.json({ limit : "30mb" ,extended : true}))

app.use('/',Auth)
app.use('/',Post)

app.get('/',(req,res) => {
  res.json({
    message : "Success"
  })
})

app.listen(PORT,()=>{
  console.log(`Server is running  on port: ${PORT}`);
})
