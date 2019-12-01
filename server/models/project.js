const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const projectSchema = new Schema({
  OwnerId: {
    type: ObjectId,
    ref: 'User',
  },
  TodoId: [{type: ObjectId, ref: 'Todo'}],
  UserId: [{type: ObjectId, ref: 'User'}],
  projectName: {
    type: String,
    required: "Project name required"
  }
},{timestamps:true,versionKey:false})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project