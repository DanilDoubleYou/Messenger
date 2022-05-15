import pkg from 'mongoose';
const { Schema, model, Types } = pkg;

const UserSchema = new Schema({
    firstName : { required: true, type: String},
    lastName : { required: true, type: String},
    email : { required: true, unique: true, type: String},
    password: { required: true, type: String},
    avatar: { type: String }
}, {timestamps: true})

export default model('User', UserSchema)