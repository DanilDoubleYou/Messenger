//mongodb config
import mongoose from "mongoose"
//express config
import express from "express";
//.env config
import 'dotenv/config'

import router from './routes/auth.routes.js'

const app = express();

app.use(express.json({extended: true}));

//host config
const host = 'localhost'
const port = process.env.PORT

//server&mongodb start



//

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

app.use((req, res, next) => {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let data = `${hour}:${minutes}:${seconds} ${req.method} ${host}:${port}${req.url} request`; //${request.get("user-agent")}
  console.log(data);
  next();
});

app.use('/api/auth', router)