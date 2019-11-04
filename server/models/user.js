const mongoose = require('mongoose')
const { hashPass } = require('../helpers/bcrypt')
const {Schema, model} = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name cannot be empty.']
  },
  email: {
    type: String,
    required: [true, 'Email cannot be empty'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'],
    validate: {
      validator: function(value) {
        return User.findOne({ email: value})
          .then(user=> {
            if(user) return false
          })
      }, message: props => `${props.value} is already taken.`
    }
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty'],
    minlength: [5, 'Password is minimum of 5 characters']
  }
}, {versionKey: false, timestamps: true})

userSchema.pre('save', function(next) {
  this.password = hashPass(this.password)
  next()
})

const User = model('User', userSchema)

module.exports = User
