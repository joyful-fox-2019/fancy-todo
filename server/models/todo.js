const { Schema, model } = require('mongoose')

const todoSchema = new Schema (
    {
        name: String,
        description: String,
        status: String,
        dueDate: Date,
        UserId: String
    }
)

const Todo = model('Todo', todoSchema)
module.exports = Todo