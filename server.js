import express from 'express'
import http from 'http'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { init, io } from './io.js'

import tempRoutes from './routes/temp.js'
import authRoutes from './routes/auth.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const port = process.env.PORT || 5000

dotenv.config()

const app = express()

const server = http.createServer(app)
init(server)

mongoose.connect(process.env.DATABASE).then(() => { console.log('DB CONNECTED') })

app.use(express.json())
app.use(cors())

app.use('/temp', tempRoutes)
app.use('/auth', authRoutes)

app.use(express.static(__dirname + '/dist'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

server.listen(port, () => {
  console.log(`Server running at ${port}`)
})