import path from 'path'

//mongodb config
import mongoose from "mongoose"

//express config
import express from "express";
import serverRoutes from './routes/servers.js';

//.env config
import 'dotenv/config'

//auth0 config
import { auth } from 'express-openid-connect';

const app = express();
const __dirname = path.resolve()

//ejs config
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'))

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

app.use(express.static(path.resolve(__dirname, 'static')))

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

//server&mongodb start

async function start()
{
  try {
    
      await mongoose.connect(`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.ikpwi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
          useNewUrlParser: true,
          useUnifiedTopology: true
      })

      app.listen(port, host, () =>  {
        console.log(`Server listens http://${host}:${port}`)
      })

  } catch (e)
  {
    console.error(e);
  }
}

start()

