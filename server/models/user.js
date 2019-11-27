const mongoose = require('mongoose')
const {
    hashPassword
} = require('../helpers/bcryptjs')
const Schema = mongoose.Schema


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, `Name must be filled`]
    },
    email: {
        type: String,
        required: [true, `Email must be filled`],
        validate: [{
            validator: function (value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message: 'Invalid email format'
        }]
    },
    password: {
        type: String,
        required: [true, `Password must be filled`]
    }
})

userSchema.pre('save', function (next) {
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User