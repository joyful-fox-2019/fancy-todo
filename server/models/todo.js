const mongoose = require('mongoose')
const { Schema, model } = mongoose

const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  deadline: {
    type: Date,
    validate: {
      validator: function (value) {
        if(new Date(value) < new Date()) return false
      }, message: props => 'Cannot add deadline in the past.'
    }
  },
  description: {type: String, required: [true, 'Description is required']},
  owner: {type: Schema.Types.ObjectId, ref:'User'},
  project: {type: Schema.Types.ObjectId, ref: 'Project'},
  status: {type: Schema.Types.Boolean, default:false}
}, {timestamps: true, versionKey: false})

const Todo = model('Todo', todoSchema)

module.exports = Todo
