import { Router } from "express";
import Yup from 'yup'

const router = Router()

const schema = Yup.object().shape({
    fullname: Yup.string().required('نام کامل الزامی است.').min(3, 'نام کامل باید حداقل ۳ کاراکتر باشد.').max(50, 'نام کامل نباید بیشتر از ۵۰ کاراکتر باشد.'),
    email: Yup.string().email('ایمیل نامعتبر است.').required('ایمیل الزامی است.'),
    password: Yup.string().required('رمز عبور الزامی است.').min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد.').max(20, 'رمز عبور نباید بیشتر از ۲۰ کاراکتر باشد.'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'رمز عبور و تأیید رمز عبور باید یکسان باشند.').required('تأیید رمز عبور الزامی است.')
})

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
    const validator = schema.validate(req.body)
    console.log(validator)
    validator
        .then((result) => {
            console.log(result)
            res.send('Validation passed, proceed with registration logic')
        })
        .catch(err => {
            console.log(err.errors)
            res.send({
                errors: err.errors
            })
        })

    // did not work for me for some reason
    // schema.validate(req.body)
    //     .then((result) => {
    //         console.log(result)
    //         res.send('Validation passed, proceed with registration logic')
    //     })
    //     .catch((err) => {
    //         console.log(err.errors)
    //         res.send({
    //             errors: err.errors
    //         })
    //     })
})

export default router
