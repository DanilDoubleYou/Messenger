//mongodb config
import mongoose from "mongoose"
//express config
import express from "express"
//.env config
import 'dotenv/config'
//api/auth router
import router from './routes/router.js'

const app = express()

app.use(express.json({extended: true}))

app.use((req, res, next) => {
  let now = new Date()
  let hour = now.getHours()
  let minutes = now.getMinutes()
  let seconds = now.getSeconds()
  let data = `${hour}:${minutes}:${seconds} ${req.method} ${host}:${port}${req.url} request`
  console.log(data)
  next()
})

//all post requests
app.use('/api', router)

//host config
const host = '127.0.0.1'
const port = process.env.PORT

//server & mongodb start function
async function start()
{
  try {
    
      await mongoose.connect(`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.ikpwi.mongodb.net/messenger?retryWrites=true&w=majority`, {
          useNewUrlParser: true,
          useUnifiedTopology: true
      })

      app.listen(port, host, () =>  {
        console.log(`Server listens http://${host}:${port}`)
      })

  } catch (e) {console.error(e);}
}

start()