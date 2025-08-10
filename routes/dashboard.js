import { Router } from "express";
import isAuthenticated from "../middlewares/auth.js";

const router = new Router()

// @desc    Dashboard Home Page
// @route   GET /dashboard
router.get('/', isAuthenticated, (req, res) => {
    res.render('dashboard', { pageTitle: 'بخش مدیریت | داشبورد', path: '/dashboard', layout: './layouts/dashLayout' })
})

export default router