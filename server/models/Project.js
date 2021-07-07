const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projects = new Schema({
  name : {
    type : String,
    required : [true, 'Project name is required']
  },
  desc : {
    type : String,
    required : [true, 'Project description is required']
  },
  creator : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  todos : [{
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  }],
  members : [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
},{
  timestamps : true
})

const Project = mongoose.model('Project',projects)
module.exports = Project