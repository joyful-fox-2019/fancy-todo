const mongoose = require('mongoose')
const { Schema } = mongoose
const Project = require('../models/Project')

const taskSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Task name cannot be empty']
  },
  description: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date,
    required: [true, 'Date and time cannot be empty']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  versionKey: false
})

module.exports = mongoose.model('Task', taskSchema)