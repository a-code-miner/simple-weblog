import { Router } from "express";

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
router.post('/register', (req, res) => {
    console.log(req.body)
    res.send('User registration logic goes here')
})

export default router
