import { Router } from 'express'
import path from 'path'

const router = new Router()

// @desc    Weblog Home Page
// @route   GET /
router.get('/', (req, res) => {
    res.render('index', { pageTitle: 'وبلاگ ساده', path: '/' })
})


export default router
