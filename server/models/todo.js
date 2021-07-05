const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodosSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: [true, 'Descrription is required']
  },
  status: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date,
    required: [true, 'dueDate is required'],
    min: [new Date().setDate(new Date().getDate() - 1), `Wrong Date!`],
    default: new Date()
  },
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  projectId: {
    type: Schema.Types.ObjectId, ref: 'Project'
  }
})


const Todo = mongoose.model('Todo', TodosSchema)

module.exports = Todo