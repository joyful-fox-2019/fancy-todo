const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    name : {type : String, required : [true, "Project Name is Required"]},
    TodosId : [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
    UsersId : [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project