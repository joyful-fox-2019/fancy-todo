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
  done:{
    type: Boolean,
    default: false
  },
  project_id:
  {
    type: Schema.Types.ObjectId, ref: 'Project'
  },
  user_id: 
  {
    type: Schema.Types.ObjectId, ref: 'User'
  }
},{
  timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo