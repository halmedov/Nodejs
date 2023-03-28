const http = require("http");
const PORT = 5005;

const some_html = "<h1>Hello World!</h1><p>Bazarbay</p>"

const server = http.createServer((req,res)=>{
  res.write(some_html)
  console.log("Welcome to Server");
  res.end()
})

server.listen(PORT)
