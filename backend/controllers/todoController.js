const Todo = require('../models/todo')

const createTodos = async(req, res) => {
    try {
        const {content} = req.body
        const todo = await Todo.create({content})
        return res.json({
            message: "Todo created",
            success: true,
            data: todo
        })
    } catch (error) {
        return res.json({error: error.message, status:500})
    }
}

const allTodos = async(req, res) => {
    try {
        const allTodos = await Todo.find({})
        return res.json({
            message: "All Todos",
            success: true,
            data: allTodos
        })
    } catch (error) {
        return res.json({error: error.message, status:500})
    }
}

const editTodos = async(req, res) => {
    try {
        const {content, completed} = req.body
        const todoId = req.params.id
        const editedTodo = await Todo.findByIdAndUpdate({_id: todoId},{$set: {content, completed}},{new: true})
        const updatedTodo = await editedTodo.save()
        return res.json({
            message: "Todo Updated",
            success: true,
            data: updatedTodo
        })
    } catch (error) {
        return res.json({error: error.message, status:500})
    }
}

const deleteTodos = async(req, res) => {
    try {
        const todoId = req.params.id
        await Todo.deleteOne({_id: todoId})
        return res.json({
            message: "Todo Deleted",
            success: true,
        })
    } catch (error) {
        return res.json({error: error.message, status:500})
    }
}


module.exports = {
    createTodo,
    allTodos,
    editTodo,
    deleteTodo
}