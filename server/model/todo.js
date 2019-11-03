const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const todoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    status: {
        type: String,
        default: 'UNCOMPLETE'
    },
    dueDate: {
        type: Date,
        required: [true, 'Due Date is required']
    },
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    projectId: {
        type: ObjectId,
        ref: 'Project'   
    },
    share:{
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Todo', todoSchema);