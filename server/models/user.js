const { Schema, model } = require('mongoose')
const { hashPassword } = require('../helpers/passwordEncryptor')
const userSchema = new Schema (
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        }
    }
)

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

userSchema.post('save', function(err, doc, next) {
    if(err.name === 'MongoError' && err.code === 11000) {
        next({ status: 401, message: 'Email is already registered' }) 
    } else {
        next(err)
    }
})

const User = model('User', userSchema)
module.exports = User