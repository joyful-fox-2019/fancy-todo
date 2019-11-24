const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema ({
    master: {
        type: mongoose.Types.ObjectId, 
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Project Title Cannot be empty']
    },
    description: {
        type: String,
        min: [8, 'Description must have min 8 length character'],
        require:[true, 'Description cannot be empty']
    },
    members: [{
        type: mongoose.Types.ObjectId, 
        ref: 'User',
    }],
    todos: [{
        type: mongoose.Types.ObjectId, 
        ref: 'Todo',
        default: []
    }]
})

const project = mongoose.model('Project', projectSchema)
module.exports = project;