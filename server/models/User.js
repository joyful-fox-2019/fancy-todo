const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcrypt')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    email: {
        required: [true, `email can't be empty`],
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address. Must include "@" and "." '],
        unique: [true, `email already registered`]
    },
    name: {
        type: String,
        required: [true, `name can't be empty`],
        minlength: [3, 'name must be longer or equal to 3 characters length']
    },
    password: {
        type: String,
        required: [true, `password can't be empty`],
    }
})

UserSchema.pre('save', function () {
    this.password = hashPassword(this.password)
})

const User = mongoose.model('Users', UserSchema)

module.exports = User