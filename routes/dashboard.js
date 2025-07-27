import { Router } from "express";

const router = new Router()

// @desc    Dashboard Home Page
// @route   GET /dashboard
router.get('/', (req, res) => {
    res.render('dashboard', { pageTitle: 'بخش مدیریت | داشبورد', path: '/dashboard', layout: './layouts/dashLayout' })
})

// @desc    Login Page
// @route    GET /dashboard/login
router.get('/login', (req, res) => {
    res.render('login', { pageTitle: 'صفحه لاگین', path: '/login' })
})

export default router