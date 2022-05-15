import pkg from 'mongoose';
const { Schema, model, Types } = pkg;

const ConversationSchema = new Schema({
    members: {
        type: Array,
        unique: true                    ///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
    },
}, {timestamps: true})

export default model('Conversation', ConversationSchema)