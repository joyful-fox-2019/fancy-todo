const mongoose = require('mongoose')

let Schema = mongoose.Schema

let todoSchema = new Schema({
  title: {
    type:String,
    required: [true, 'Title is required']
  },
  description: {
    type:String,
    required: [true, 'Description is required']
  },
  duedate: {
    type:Date,
    required: [true, 'Duedate is required'],
    validate: {
      validator: function (v) {
        return new Date(v) > new Date()
      },
      message: 'Due Date has Passed'
    }
  },
  status: {
    type:Boolean,
    default:false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, 
{
  timestamps:true, 
  versionKey: false
})

let Todo = mongoose.model('Todo',todoSchema)

module.exports = Todo
