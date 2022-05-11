import { Schema, model, Types } from "mongoose"

const schema = new Schema ({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    id: {type: Number, required: true, unique: true}
})

export default model('User', schema)