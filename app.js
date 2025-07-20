import path from 'path'
import { fileURLToPath } from 'url'

import express from 'express'

import router from './routes/index.js'

// تبدیل import.meta.url به __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

//* View Engine
app.set('view engine', 'ejs')
app.set('views', 'views')

//* Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//* Routes
app.use(router)



app.listen(3000, () => { console.log(`Server is running on localhost:3000`) })
