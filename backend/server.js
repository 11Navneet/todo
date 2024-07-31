require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const todoRouter = require('./routes/todoRoute')
const express = require('express')
const app = express()

mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB connected")).catch((error) => console.log("DB connection failed: ", error.message))
app.use(cors())
app.use(express.json())
app.use('/todo', todoRouter)

app.listen(process.env.PORT, () => {
    console.log('Server is running on port:', process.env.PORT)
})