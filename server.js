import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import tempRoutes from './routes/temp.js'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()

mongoose.connect(process.env.DATABASE).then(() => { console.log('DB CONNECTED') })

app.use(express.json())
app.use(cors())
app.use('/temp', tempRoutes)
app.use('/auth', authRoutes)

app.listen(5000, () => {
  console.log('Server running')
})