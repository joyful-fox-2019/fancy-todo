const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, `title task is required`]
    },
    description: {
        type: String,
        required: [true, 'please describe your task']
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    status: {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo