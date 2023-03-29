const http = require("http");
const express = require("express");
const mongoClient = require("mongodb").mongoClient;
const bodyParser = require("body-parser");
const PORT = 8000;

const app = express()

app.listen(PORT,()=>{
  console.log(`Server is running on port: ${PORT}`);
})
