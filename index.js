import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/users.js'

const app = express()
dotenv.config()

const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log('Connected to DB')
    }).catch(err => { throw err})
}

app.use('/api/users', userRoutes)

app.listen(8800, () => {
    connect()
    console.log('Connected to Server')
})