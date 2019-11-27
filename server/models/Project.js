const mongoose = require('mongoose')
const { Schema } = mongoose

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name cannot be empty']
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task'
    }
  ]
}, {
  versionKey: false
})

module.exports = mongoose.model('Project', projectSchema)