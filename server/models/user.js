const { Schema, model } = require('mongoose')
const { hashPassword } = require('../helpers/bcryptjs')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please fill name of user'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [8, 'password minimum contain 8 characthers']
  }
})

userSchema.plugin(uniqueValidator)

userSchema.pre('save', function (next) {
  this.password = hashPassword(this.password)
  next()
})

const User = model('User', userSchema)

module.exports = User
