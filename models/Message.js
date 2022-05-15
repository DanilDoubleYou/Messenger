import pkg from 'mongoose';
const { Schema, model, Types } = pkg;

const MessageSchema = new Schema({
    conversationId: {
        type: String, //Schema.Types.ObjectId?
    },
    sender: {
        type: String,
    },
    text: {
        type: String,
    }
}, {timestamps: true})

export default model('Message', MessageSchema)