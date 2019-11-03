const mongoose = require('mongoose')
const { Schema } = mongoose

const todoSchema = new Schema({
  title: String,
  description: String,
  completed: Boolean,
  important: Boolean,
  dueDate: Date,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo