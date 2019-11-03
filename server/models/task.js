'use strict'

const { Schema, model } = require('mongoose');

const taskSchema = new Schema ({
  title: {
    type: String,
    required: [true, `Please input the task's title`]
  },
  description: {
    type: String
  },
  status:{
    type: String
  },
  dueDate: {
    type: Date
  },
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},{timestamps: true});

const Task = model('Task', taskSchema);

module.exports = Task;