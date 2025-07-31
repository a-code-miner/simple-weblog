import { Router } from "express";

const router = new Router()

// @desc    Dashboard Home Page
// @route   GET /dashboard
router.get('/', (req, res) => {
    res.render('dashboard', { pageTitle: 'بخش مدیریت | داشبورد', path: '/dashboard', layout: './layouts/dashLayout' })
})

export default router