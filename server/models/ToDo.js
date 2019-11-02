const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ToDoSchema = new Schema({
    title: {
        type: String,
        required: [true, `title can't be empty`]
    },
    description: {
        type: String,
        required: [true, `description can't be empty`]
    },
    status: {
        type: Boolean
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    dueDate: {
        type: Date,
        required: [true, `date can't be empty`]
    }
})

ToDoSchema.pre('save', function() {
    this.status = false
})

const ToDo = mongoose.model('ToDos', ToDoSchema)

module.exports = ToDo