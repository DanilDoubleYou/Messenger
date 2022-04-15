const { response } = require("express");
const express = require("express");
const app = express();

const host = 'localhost'
const port = 7000

//request info (middleware)
app.use(function(request, response, next){
     
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let data = `${hour}:${minutes}:${seconds} ${request.method} ${host}:${port}${request.url} request`; //${request.get("user-agent")}
  console.log(data);
  next();
});

//404 test page
app.use('/home/foo', function(request, response){
    response.sendStatus(404);
});

//home page
app.use("/home/", function(request, response){
  response.send("Home Page!");
});

//main page
app.get("/", function(request, response){
    response.send("Main Page!");
});

//server start
app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`)
});