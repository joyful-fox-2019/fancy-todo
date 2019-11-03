const validate = require('mongoose-validator')
const mongoose = require('mongoose')
const { hash } = require('../helpers/bcrypyAccess')
const { Schema, model } = mongoose

const UserSchema = new Schema({
    email : {
        type : String,
        require : [true, 'email is required!'],
        unique : [true, 'email has been taken!'],
        validate : [
            validate({
                validator : 'isEmail',
                message : 'please insert valid email!'
            })
        ]
    },
    password : {
        type : String,
        require : [true, 'password is required!']
    }
})

UserSchema.pre('save',function(next){
    this.password = hash(this.password)
    next()
})

module.exports = model('User',UserSchema)