const express = require('express')
const { authenticateToken } = require("../utilities");
const { createTodos, allTodos, editTodos, deleteTodos } = require('../controllers/todoController')
const todoRouter = express.Router()

todoRouter.post('/create', authenticateToken, createTodos)
todoRouter.get('/', authenticateToken, allTodos)
todoRouter.put('/edit/:id', authenticateToken, editTodos)
todoRouter.delete('/delete/:id', authenticateToken, deleteTodos)

module.exports = todoRouter