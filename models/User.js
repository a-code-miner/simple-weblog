import mongoose from "mongoose";
import Yup from 'yup'

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

const schema = Yup.object().shape({
    fullname: Yup.string().required('نام کامل الزامی است.').min(3, 'نام کامل باید حداقل ۳ کاراکتر باشد.').max(50, 'نام کامل نباید بیشتر از ۵۰ کاراکتر باشد.'),
    email: Yup.string().email('ایمیل نامعتبر است.').required('ایمیل الزامی است.'),
    password: Yup.string().required('رمز عبور الزامی است.').min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد.').max(20, 'رمز عبور نباید بیشتر از ۲۰ کاراکتر باشد.'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'رمز عبور و تأیید رمز عبور باید یکسان باشند.').required('تأیید رمز عبور الزامی است.')
})

userSchema.statics.validateUser = async function (body) {
    return await schema.validate(body, { abortEarly: false })
}

const User = mongoose.model('User', userSchema)

export default User
