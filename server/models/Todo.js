const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todo = new Schema({
  title : {
    type : String,
    required : [true,'title is required']
  },
  desc : {
    type : String,
    required : [true,'descriptions is required']
  },
  status : {
    type : String,
    default : 'To-do'
  },
  // userId : [{
  //   type: Schema.Types.ObjectId,
  //   ref : 'User'
  // }],
  dueDate : {
    type : Date,
    default : new Date(+new Date() + 14*24*60*60*1000)
  },
  projectId : {
    type: Schema.Types.ObjectId,
    ref : 'Project'
  }
},{
  timestamps : true
})

todo.pre('save',function(next){
  if (this.dueDate === null){
    this.dueDate = new Date(+new Date() + 14*24*60*60*1000)
    next()
  }
})

const Todo = mongoose.model('Todo',todo)
module.exports = Todo