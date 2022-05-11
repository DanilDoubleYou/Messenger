//mongodb config
import mongoose from "mongoose"

//express config
import express from "express";
//.env config
import 'dotenv/config'

const app = express();

//host config
const host = 'localhost'
const port = process.env.PORT ?? 80

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

