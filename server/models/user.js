const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'You should enter your name!']
        },
    email: {
        type: String,
        required: [true, 'You should enter your email!'],
        unique: [true, 'Email already registered!']
        },
    password: {
        type: String
        }
})

const User = mongoose.model('User', userSchema)

module.exports = User