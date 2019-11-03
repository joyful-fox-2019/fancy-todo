const { Schema,model } = require('mongoose')

const projectSchema = new Schema ({
    name : {
        type : String,
        required : [true, 'Project name is required']
    },
    owner: {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    members : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    todoId : [{
        type : Schema.Types.ObjectId,
        ref : 'Todo'
    }]
}, {
    timestamps : true,
    versionKey : false
})

const Project = model('Project',projectSchema)

module.exports = Project