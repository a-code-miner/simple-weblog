import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 255,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const User = mongoose.model('User', UserSchema)

export default User
