require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const todoRouter = require('./routes/todoRoute')
const userRouter = require('./routes/userRoute')
const express = require('express')
const app = express()

mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB connected")).catch((error) => console.log("DB connection failed: ", error.message))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN,
}))
app.use('/todo', todoRouter)
app.use('/', userRouter)

app.listen(process.env.PORT, () => {
    console.log('Server is running on port:', process.env.PORT)
})