import pkg from 'mongoose';
const { Schema, model, Types } = pkg;

const UserSchema = new Schema({
    firstName : { required: true, type: String},
    lastName : { required: true, type: String},
    email : { required: true, unique: true, type: String},
    password: { required: true, type: String},
    avatar: { type: String, default: "https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8="}
}, {timestamps: true})

export default model('User', UserSchema)