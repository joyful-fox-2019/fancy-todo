const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Name cannot be empty']
    },
    description:{
        type: String,
    },
    status:{
        type: Boolean,
        default: false
    },
    dueDate:{
        type: Date
    },
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    versionKey: false
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;