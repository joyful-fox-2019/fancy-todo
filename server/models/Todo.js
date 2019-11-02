const { Schema, model } = require('mongoose')

const todoSchema = new Schema({
  title : {
    type : String,
    required : [true, 'Give your todo a name, please!']
  },
  description : {
    type : String,
    required : [true, `Hey! a little detail wont hurt`]
  },
  userId : {
    type : Schema.Types.ObjectId,
    ref : `User`
  },
  dueDate : {
    type : Date,
    required : [true, `When is the deadline?`]
  }, 
  Status : {
    type : Boolean,
    default : false
  }
})

const Todo = model('Todo', todoSchema)

module.exports = Todo