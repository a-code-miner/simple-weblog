import User from "../models/User.js";

export const login = async (req, res) => {
    res.render('login', { pageTitle: 'صفحه لاگین', path: '/login' })
}

export const register = async (req, res) => {
    res.render('register', { pageTitle: 'ثبت‌نام کاربر جدید', path: '/register' })
}

export const createUser = async (req, res) => {
    const errors = []
    try {
        await User.validateUser(req.body);
        const { fullname, email, password } = req.body

        const existingUser = await User.find({ email })

        if (existingUser.length > 0) {
            errors.push({
                message: 'این ایمیل قبلا ثبت‌نام شده است.',
            })
            return res.render('register', {
                pageTitle: 'ثبت‌نام کاربر جدید',
                path: '/register',
                errors,
                oldData: req.body
            })
        }
        await User.create(req.body)
        res.redirect('/users/login')
        // const user = new User({
        //     fullname,
        //     email,
        //     password
        // })
        // user.save()
        //     .then((user) => {
        //         console.log('User created successfully:', user);
        //         res.redirect('/users/login')
        //     })
        //     .catch((err) => {
        //         if (err) throw err
        //     })
    } catch (err) {
        console.log(err)
        if (err.inner && Array.isArray(err.inner)) {
            err.inner.forEach(error => {
                errors.push({
                    name: error.path,
                    message: error.message
                })
            })
        } else {
            // اگر inner وجود ندارد، شاید خطا از جای دیگری آمده
            errors.push({
                name: 'general',
                message: err.message || 'خطای ناشناخته‌ای رخ داده است.'
            })
        }

        return res.render('register', {
            pageTitle: 'ثبت‌نام کاربر جدید',
            path: '/register',
            errors,
            oldData: req.body
        })
    }
}
