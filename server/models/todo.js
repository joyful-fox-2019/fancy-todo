const mongoose = require('mongoose')
const { Schema } = mongoose

const todoSchema = new Schema({
  title: {
    type: String,
    required: [ true, 'Title Must Be Filled' ]
  },
  description: {
    type: String,
    required: [ true, 'Description Must Be Filled']
  },
  dueDate: {
    type: Date,
    required: [ true, 'Due Date Must Be Filled'],
    min : [new Date().setDate(new Date().getDate()- 1), 'Input Date is Invalid!']
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  event: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }
}, { timestamps: true})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo