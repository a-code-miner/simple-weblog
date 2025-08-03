import { Router } from "express";
// import Yup from 'yup'
import Validator from "fastest-validator";

const router = Router()
const v = new Validator()

const schema = {
    fullname: { type: "string", min: 3, max: 50, optional: false, messages: { required: "نام کامل الزامی است.", stringMin: "نام کامل باید حداقل ۳ کاراکتر باشد.", stringMax: "نام کامل نباید بیشتر از ۵۰ کاراکتر باشد." } },
    email: { type: "email", optional: false, messages: { emailEmpty: 'فیلد ایمیل نباید خالی باشد!', required: "ایمیل الزامی است.", email: "ایمیل نامعتبر است." } },
    password: { type: "string", min: 6, max: 20, optional: false, messages: { required: "رمز عبور الزامی است.", stringMin: "رمز عبور باید حداقل ۶ کاراکتر باشد.", stringMax: "رمز عبور نباید بیشتر از ۲۰ کاراکتر باشد." } },
    confirmPassword: { type: "equal", field: "password", messages: { equalField: "رمز عبور و تأیید رمز عبور باید یکسان باشند.", required: "تأیید رمز عبور الزامی است." } }
}

// const schema = Yup.object().shape({
//     fullname: Yup.string().required('نام کامل الزامی است.').min(3, 'نام کامل باید حداقل ۳ کاراکتر باشد.').max(50, 'نام کامل نباید بیشتر از ۵۰ کاراکتر باشد.'),
//     email: Yup.string().email('ایمیل نامعتبر است.').required('ایمیل الزامی است.'),
//     password: Yup.string().required('رمز عبور الزامی است.').min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد.').max(20, 'رمز عبور نباید بیشتر از ۲۰ کاراکتر باشد.'),
//     confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'رمز عبور و تأیید رمز عبور باید یکسان باشند.').required('تأیید رمز عبور الزامی است.')
// })

// @desc    Login Page
// @route    GET /users/login
router.get('/login', (req, res) => {
    res.render('login', { pageTitle: 'صفحه لاگین', path: '/login' })
})

// @desc    Register Page
// @route    GET /users/register
router.get('/register', (req, res) => {
    res.render('register', { pageTitle: 'ثبت‌نام کاربر جدید', path: '/register' })
})

// @desc    Handle User Registration
// @route    POST /users/register
router.post('/register', (req, res) => {
    // const validator = schema.validate(req.body)
    // console.log(validator)
    // validator
    //     .then((result) => {
    //         console.log(result)
    //         res.redirect('/users/login')
    //     })
    //     .catch(err => {
    //         console.log(err.errors)
    //         res.render('register', { pageTitle: 'ثبت‌نام کاربر جدید', path: '/register', errors: err.errors, oldInput: req.body })
    //     })
    const validate = v.validate(req.body, schema)
    const errorArr = []
    if (validate === true) {
        const { fullname, email, password, confirmPassword } = req.body
        if (password !== confirmPassword) {
            errorArr.push({ message: "رمز عبور و تأیید رمز عبور باید یکسان باشند." })
            return res.render('register', { pageTitle: 'ثبت‌نام کاربر جدید', path: '/register', errors: errorArr, oldInput: req.body })
        }
        res.redirect('/users/login')
    } else {
        res.render('register', { pageTitle: 'ثبت‌نام کاربر جدید', path: '/register', errors: validate, oldInput: req.body })
    }
})

export default router
