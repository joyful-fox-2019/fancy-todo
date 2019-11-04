const mongoose = require('mongoose')
const { Schema } = mongoose

const projectSchema = new Schema({
  title: {
    type: String,
    required: [ true, ' Title is required' ]
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Todo'
    }
  ]

}, { timestamps: true })


const Project = mongoose.model('Project', projectSchema)
module.exports = Project