import pkg from 'mongoose';
const { Schema, model, Types } = pkg;

const UserSchema = new Schema({
    firstName : { required: true, type: String},
    lastName : { required: true, type: String},
    email : { required: true, unique: true, type: String},
    password: { required: true, type: String},
    avatar: { type: String},
    groups: [{ name: String, reference : {type: Schema.Types.ObjectId,ref: "Group"}}],
    friends: [{type: Schema.Types.ObjectId,ref : "User"}]
})

export default model('User', UserSchema)