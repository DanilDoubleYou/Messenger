import Router from "express"
import Message from "../models/Message.js"

const messageRouter = new Router()

//add

messageRouter.post('/', async (req, res) => {
    const newMessage = new Message(req.body)

    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (e) {
        console.error(e)
    }
})

//get

messageRouter.get('/:conversationId', async (req, res) => {
    try {
        const allMessages = await Message.find({
            conversationId: req.params.conversationId,
        })
        res.status(200).json(allMessages)
    } catch (e) {
        console.error(e)
    }
})

export default messageRouter