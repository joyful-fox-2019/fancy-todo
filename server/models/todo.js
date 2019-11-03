const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'You should enter todo\'s name']
        },
    description: {
        type: String,
        required: [true, 'You should enter todo\'s description']
        },
    status: {
        type: String
    },
    dueDate: {
        type: Date,
        required: [true, 'You should enter todo\'s due date']
    },
    UserId: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo