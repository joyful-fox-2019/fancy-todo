const mongoose = require('mongoose')
const Schema = mongoose.Schema

let projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    todo: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }]
})

let Project = mongoose.model('Project', projectSchema)

module.exports = Project