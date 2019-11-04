const mongoose = require('mongoose')
const { hash } = require('../helpers/hashPassword')

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        validate: {
            validator: function (value) {
                return this.model('User').findOne ({username: value})
                .then(function (user) {
                    if (user) {
                        return false
                    }else {
                        return true
                    }    
                })
            },
            message: props => `${props.value} already taken`
        },
        required: [true, 'Username Cannot be Empty']
    },
    email: {
        type: String,
        validate: [{
            validator: function (email) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)
            },
            message: props => `${props.value} is not valid email format`
        },
        {
            validator: function (value) {
                return this.model('User').findOne({email: value})
                .then(function (email) {
                    if (email) {
                        return false
                    }else {
                        return true
                    }
                })
            }
        }
    ],
        required: [true, 'Email Cannot be Empty']
    },
    password: {type: String, required: [true, 'Password Cannot be Empty']}

})

userSchema.pre('save', function (next) {
    const pass = this.password
    this.password = hash(pass)
    next()
})

const user = mongoose.model('User', userSchema)
module.exports = user;