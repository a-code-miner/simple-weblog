import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

import schema from "./secure/userValidation.js";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'نام کامل الزامی است.'],
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



userSchema.statics.validateUser = async function (body) {
    return await schema.validate(body, { abortEarly: false })
}

userSchema.pre('save', async function (next) {
    let user = this
    if (!user.isModified('password')) {
        return next()
    }
    try {
        const hash = await bcrypt.hash(user.password, 10)
        user.password = hash
        next()
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model('User', userSchema)

export default User
