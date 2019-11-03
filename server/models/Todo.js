const { Schema,model } = require('mongoose')
const { todoValidationTitle,todoValidationDesc } = require('../helpers/validator')

const todoSchema = new Schema ({
    title : {
        type: String,
        required : [true, 'Title is required'],
        validate: todoValidationTitle
    },
    description : {
        type : String,
        required : [true, 'Description is required'],
        validate: todoValidationDesc
    },
    status : {
        type : Boolean,
        default : false
    },
    dueDate : {
        type : Date,
        required: [true, 'Due date is required'],
        min : [new Date().setDate(new Date().getDate()- 1), 'out dated']
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    projectId : {
        type : Schema.Types.ObjectId,
        ref: 'Project'
    }
},{
    timestamps: true,
    versionKey: false
})

const Todo = model('Todo',todoSchema)

module.exports = Todo