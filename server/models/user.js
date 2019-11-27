const mongoose = require('mongoose')
const { hash } = require('../helpers/bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name.']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address.'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
        validate: {
            validator: function (value) {
                return User.findOne({ email: value })
                    .then(user => {
                        if (user) return false
                    })
            }, message: props => `Email ${props.value} is already registered`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    isGoogle: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User