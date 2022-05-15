import pkg from 'mongoose';
const { Schema, model, Types } = pkg;

const ConversationSchema = new Schema({
    members: {
        type: Array
    },
}, {timestamps: true})

export default model('Conversation', ConversationSchema)