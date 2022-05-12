import pkg from 'mongoose';
const { Schema, model, Types } = pkg;

const schema = new Schema ({
    email: {type: String, required: true},
    password: {type: String, required: true}
})

export default model('User', schema)