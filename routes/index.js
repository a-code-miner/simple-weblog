import { Router } from 'express'

const router = new Router()

router.get('/', (req, res) => {
    res.render('index', { pageTitle: 'وبلاگ ساده' })
})

router.get('/login', (req, res) => {
    res.render('login', { pageTitle: 'صفحه لاگین', layout: './layouts/loginLayout' })
})

export default router
