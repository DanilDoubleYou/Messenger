import pkg from 'mongoose';
const { Schema, model, Types } = pkg;

const schema = new Schema ({
    firstName: {type: String, required: true, unique: false},
    lastName: {type: String, required: true, unique: false},
})

export default model('User', schema)