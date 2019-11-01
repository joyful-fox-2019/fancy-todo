const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title:  {
    type: String,
    required: [true, 'please input title']
  },
  description: {
    type: String,
    required: [true, 'please input description']
  },
  project_id:
  {
    type: Schema.Types.ObjectId, ref: 'project'
  },
  user_id: 
  {
    type: Schema.Types.ObjectId, ref: 'user'
  }
},{
  timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo