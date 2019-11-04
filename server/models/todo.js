const { Schema, model } = require('mongoose')

const todoSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please fill name of todo']
  },
  desc: {
    type: String,
    required: [true, 'Please fill desc of todo']
  },
  due_date: {
    type: Date,
    required: [true, 'due date is required']
  },
  status: {
    type: Boolean,
    default: false
  },
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Todo = model('Todo', todoSchema)

module.exports = Todo
