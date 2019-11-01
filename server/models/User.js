const mongoose = require('mongoose')
const { Schema } = mongoose
const { hashPassword } = require('../helpers/bcryptjs')

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email cannot be empty'],
    unique: true,
    validate: {
      validator: function(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      message: props => `${props.value} is not a valid email`
    }
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty'],
    minlength: [6, 'Password should at least has 6 characters']
  }
}, {
  versionKey: false
})

userSchema.pre('save', function(next) {
  try {
    this.password = hashPassword(this.password)
    next()
  } catch (err) {
    next(err)
  }
})

module.exports = mongoose.model('User', userSchema)