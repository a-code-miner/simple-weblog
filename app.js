import path from 'path'
import { fileURLToPath } from 'url'

import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import expressEjsLayouts from 'express-ejs-layouts'

import connectDB from './configs/db.js'
import router from './routes/index.js'

// تبدیل import.meta.url به __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//* Load Config
dotenv.config({ path: './configs/config.env' })

//* Database Connection
connectDB()

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

//* Static Folder
app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static(path.join(__dirname, 'node_modules', 'bootstrap-v4-rtl', 'dist')))
// app.use(express.static(path.join(__dirname, 'node_modules', 'font-awesome')))
// app.use(express.static(path.join(__dirname, process.env.BOOTSTRAP)))
// app.use(express.static(path.join(__dirname, process.env.FONTAWESOME)))


//* Routes
app.use(router)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on localhost:${PORT}`)
})
