import Router from "express"
import User from "../models/User.js"

const userRouter = new Router()

//get a user
userRouter.get("/", async (req, res) => {
    const userId = req.query.userId
    const username = req.query.username
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username })
      const { password, updatedAt, ...other } = user._doc
      res.status(200).json(other)
    } catch (err) {
      res.status(500).json(err)
    }
  })

//get all userIds
userRouter.get("/all/", async (req, res) => {
  try{
    const _users = await User.find()
    let users = []
    _users.map((user) => {
      const { _id, firstName, lastName, avatar } = user;
      users.push({ _id, firstName, lastName, avatar });
    });
    res.status(200).json(users)
  }
  catch (e) {
    res.status(500)
    console.error(e)
  }
    
})

export default userRouter