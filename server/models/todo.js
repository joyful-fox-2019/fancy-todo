const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.ObjectId

const todoSchema = new Schema({
  UserId : {
    type: ObjectId,
    ref: 'User'
  },
  ProjectId: {
    type: ObjectId,
    ref: 'Project'
  },
  title: {
    type: String,
    required: "Title required"
  },
  description: {
    type: String,
    required: "Description required"
  },
  dueDate: {
    type: Date,
    required: "Date required"
  },
  status: {
    type: Boolean,
    default: false
  }
}, {timestamps:true,versionKey: false})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo