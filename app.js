import path from 'path'
import { fileURLToPath } from 'url'

import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import expressEjsLayouts from 'express-ejs-layouts'
import flash from 'connect-flash'
import session from 'express-session'
import passport from 'passport'

import connectDB from './configs/db.js'
import blogRoutes from './routes/blog.js'
import userRoutes from './routes/users.js'
import dashboardRoutes from './routes/dashboard.js'

// تبدیل import.meta.url به __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//* Load Config
dotenv.config({ path: './configs/config.env' })

//* Database Connection
connectDB()

//* Passport Configuration
import './configs/passport.js'

const app = express()

//* Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//* View Engine
app.use(expressEjsLayouts)
app.set('view engine', 'ejs')
app.set('layout', './layouts/mainLayout')
app.set('views', 'views')

//* Body Parser
app.use(express.urlencoded({ extended: false }))

//* Session
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
}))

//* Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//* Flash
app.use(flash()) // req.flash

//* Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//* Routes
app.use('/', blogRoutes)
app.use('/users', userRoutes)
app.use('/dashboard', dashboardRoutes)

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'صفحه مورد نظر یافت نشد', path: '' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on localhost:${PORT}`)
})
