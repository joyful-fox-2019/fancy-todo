const {
    Schema,
    model
} = require('mongoose')

const todoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name of your todo']
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['Unfinished', 'Finished'],
        default: 'Unfinished'
    },
    due_date: {
        type: Date,
        required: [true, 'Please enter the due date of your todo']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

todoSchema.pre('save', function (next) {
    if (new Date(this.due_date) < new Date()) {
        throw 'Due Date must be more than today\'s date'
    } else {
        next()
    }
})

const Todo = model('Todo', todoSchema)

module.exports = Todo