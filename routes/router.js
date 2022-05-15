import Router from "express"
import authRouter from "./auth.js"
import conversationRouter from "./conversation.js"
import messageRouter from "./message.js"
import userRouter from "./user.js"

const router = new Router()

router.use("/auth", authRouter)
router.use("/conversation", conversationRouter)
router.use("/message", messageRouter)
router.use("/user", userRouter)

export default router