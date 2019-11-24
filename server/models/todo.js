const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    title: {
        type: String, 
        required: [true, 'Title Cannot be Empty']
    },
    description: {
        type: String, 
        required: [true, 'Description Cannot be Empty']
    },
    userId: {
        type: mongoose.Types.ObjectId, 
        ref: 'User'
    },
    status: {
        type: Boolean, 
        default: false
    },
    due_date : {
        type : Date,
        default : new Date(),
        required : true
    },
    projectId: {
        type:mongoose.Types.ObjectId,
        ref: 'Project'
    },
    maker : {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const todo = mongoose.model('Todo', todoSchema)
module.exports = todo;