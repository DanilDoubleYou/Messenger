//express config
const { response } = require("express");
const express = require("express");
const app = express();

//.env config
require("dotenv").config();

//auth0 config
const { auth } = require('express-openid-connect');
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER
};

//host config
const host = 'localhost'
const port = 7000

//auth0 middleware
app.use(auth(config));

//request user info (middleware)
app.use(function(req, res, next){
  
  console.log(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let data = `${hour}:${minutes}:${seconds} ${req.method} ${host}:${port}${req.url} request`; //${request.get("user-agent")}
  console.log(data);
  next();
});

//404 test page
app.get('/home/foo', function(req, res){
    res.sendStatus(404);
});

//info page
app.get("/info/", function(req, res){
    res.send("Info Page!");
  });

//home page
app.get("/home/", function(req, res){
  res.send("Home Page!");
});

//main page
app.get("/", function(req, res){
    res.send("Main Page!");
});

//server start
app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`)
});