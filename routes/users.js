import { Router } from "express";

import User from "../models/User.js";

const router = Router()



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
router.post('/register', async (req, res) => {
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
})

export default router
