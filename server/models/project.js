const mongoose = require('mongoose')

let Schema = mongoose.Schema

let projectSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Name is Required'],
      unique:true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
    todoId: [{
      type: Schema.Types.ObjectId,
      ref: "Todo"
    }]
}, 
{
  timestamps:true,
  versionKey: false
})

let Project = mongoose.model('Project',projectSchema)

module.exports = Project