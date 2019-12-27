const { Schema, model } = require('mongoose')

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please fill name of project']
  },
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  }],
  member: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

const Project = model('Project', projectSchema)

module.exports = Project
