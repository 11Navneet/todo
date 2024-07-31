const mongoose = require('mongoose')
const todoSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.model('todo', todoSchema)
module.exports = Todo