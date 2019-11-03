const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../helpers/hashPassword')
const validate = require('mongoose-validator')

let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [
            validate({
                validator: 'isEmail',
                message: 'Invalid email format'
            })
        ]
    },
    password: {
        type: String,
        required: true
    },
    invitations: [],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    inbox: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
})

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

//Note to myself: Arrow function is not working on mongoose's .pre

let User = mongoose.model('User', userSchema)

module.exports = User