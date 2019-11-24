const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: [true, `Project Name can't be empty`]
    },
    // description: {
    //     type: String,
    //     required: [true, `description can't be empty`]
    // },
    // status: {
    //     type: Boolean
    // },
    MemberId: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    OwnerId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    ToDoId: [{
        type: Schema.Types.ObjectId,
        ref: 'ToDos'
    }]
})

ProjectSchema.pre('save', () => {
    // this.status = false
    this.MemberId.push(req.loggedUser._id)
})

const Project = mongoose.model('Projects', ProjectSchema)

module.exports = Project