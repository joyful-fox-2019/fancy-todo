const mongoose = require('mongoose')
const { Schema, model } = mongoose

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, `Project's name is required`]
  },
  members: [{type: Schema.Types.ObjectId, ref: 'User'}],
  todos: [{type: Schema.Types.ObjectId, ref: 'Todo'}],
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
}, 
{ versionKey: false,
  timestamps: true
})

const Project = model('Project', projectSchema)

module.exports = Project
