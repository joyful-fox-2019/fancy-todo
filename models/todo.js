const { Schema, model } = require('mongoose')

const todoSchema = new Schema (
    {
        name: String,
        description: String,
        status: Boolean,
        dueDate: Date
    }
)

const Todo = model('Todo', todoSchema)
module.exports = Todo