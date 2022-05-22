import Router from "express"
import Conversation from "../models/Conversation.js"
const conversationRouter = new Router()

//new conversation
conversationRouter.post("/", async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })
    try{
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)

    } catch(e)
    {
        console.error(e)
    }
})

//get all user conversations
conversationRouter.get("/:userId", async (req, res) => {
    try{
        const conversation = await Conversation.find({
            members: { $in:[req.params.userId] },
        })
        
        res.status(200).json(conversation)
    } catch(e) {
        console.error(e)
    }
})

//get conversation between two users
conversationRouter.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all:[req.params.firstUserId, req.params.secondUserId]}
        })
        if (!conversation) {
            const newConversation = new Conversation({
                members: [req.params.firstUserId, req.params.secondUserId]
            })
            const savedConversation = await newConversation.save()
            res.status(200).json(savedConversation)
        }
        res.status(200).json(conversation)
    } catch(e) {
        console.error(e)
    }
})

export default conversationRouter