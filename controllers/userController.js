import passport from "passport";

import User from "../models/User.js";

export const login = async (req, res) => {
    res.render('login', { pageTitle: 'صفحه لاگین', path: '/login', message: req.flash('success_msg'), error: req.flash('error') })
}

export const handleLogin = async (req, res, next) => {
    console.log(req.body['g-recapch-response'])
    if (!req.body['g-recaptcha-response']) {
        req.flash('error', 'اعتبارسنجی Recapcha الزامی می‌باشد!')
        return res.redirect('/users/login')
    }
    const secretKey = process.env.RECAPCHA_SECRET
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body['g-recaptcha-response']}&remoteip=${req.connection.remoteAddress}`
    console.log(req.connection.remoteAddress)
    passport.authenticate('local', {
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next)
}

export const rememberMe = (req, res) => {
    if (req.body.remember) {
        req.session.cookie.originalMaxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
    } else {
        req.session.cookie.expire = null
    }

    res.redirect('/dashboard')
}

export const logout = async (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        req.flash('success_msg', 'شما با موفقیت خارج شدید')
        res.redirect('/users/login')
    })
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

        // const hash = await bcrypt.hash(password, 10)
        await User.create({ fullname, email, password})
        req.flash('success_msg', 'ثبت‌نام موفقیت‌آمیز بود')
        res.redirect('/users/login')
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
