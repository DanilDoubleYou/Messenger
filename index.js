//express config
const { response } = require("express");
const express = require("express");
const app = express();
const serverRoutes = require('./routes/servers.js')
const _path = require("path")

//.env config
require("dotenv").config();

//auth0 config
const { auth } = require('express-openid-connect');
const { path } = require("express/lib/application");
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
const port = process.env.PORT ?? 80

app.use(express.static(_path.resolve(__dirname, 'static')))

//serverRoutes
app.use(serverRoutes)

//auth0 middleware
app.use(auth(config));

//request user info (middleware)
app.use((req, res, next) => {

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
app.get('/home/foo', (req, res) => { 
    res.sendStatus(404);
});

//info page
app.get("/info/", (req, res) => {
    res.send("Info Page!");
  });

//home page
app.get("/home/", (req, res) => {
  res.send("Home Page!");
});

//main page
app.get("/", (req, res) => {
    res.sendFile('public/main.html', {root: __dirname});
    //res.send("Main Page!");
});

//server start
app.listen(port, host, () =>  {
  console.log(`Server listens http://${host}:${port}`)
});