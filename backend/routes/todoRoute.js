const express = require('express')
const { createTodos, allTodos, editTodos, deleteTodos } = require('../controllers/todoController')
const todoRouter = express.Router()

todoRouter.post('/create', createTodos)
todoRouter.get('/', allTodos)
todoRouter.put('/edit/:id', editTodos)
todoRouter.delete('/delete/:id', deleteTodos)

module.exports = todoRouter