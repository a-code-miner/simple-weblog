import path from 'path'
import { fileURLToPath } from 'url'

import express from 'express'
import dotenv from 'dotenv'

import router from './routes/index.js'

// تبدیل import.meta.url به __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//* Load Config
dotenv.config({ path: './configs/config.env' })

const app = express()

//* View Engine
app.set('view engine', 'ejs')
app.set('views', 'views')

//* Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//* Routes
app.use(router)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on localhost:${PORT}`)
})
