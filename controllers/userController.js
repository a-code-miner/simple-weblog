import User from "../models/User.js";

export const login = async (req, res) => {
    res.render('login', { pageTitle: 'صفحه لاگین', path: '/login' })
}

export const register = async (req, res) => {
    res.render('register', { pageTitle: 'ثبت‌نام کاربر جدید', path: '/register' })
}

export const createUser = async (req, res) => {
    try {
        await User.validateUser(req.body);
        // await User.create(req.body)
        res.redirect('/users/login')
    } catch (err) {
        console.log(err)
        const errors = []
        err.inner.forEach(error => {
            errors.push({
                name: error.path,
                message: error.message
            })
        })
        return res.render('register', {
            pageTitle: 'ثبت‌نام کاربر جدید',
            path: '/register',
            errors,
        })
    }
}
