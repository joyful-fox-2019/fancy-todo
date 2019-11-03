const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: [true, `Project name is required!`]
  },
  owner: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

const Project = mongoose.model('Project', ProjectSchema)
module.exports = Project