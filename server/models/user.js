const { Schema, model } = require('mongoose');
const bcrypt = require('../helpers/bcrypt')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please input your name']
  },
  email: {
    type: String,
    required: [true, 'Please input your email address'],
    validate: [{
      validator: function (value) {
        let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
        return emailRegex.test(value)
      },
      message: props => `Email ${props.value} is not a valid email address`
    },{
      validator: function (value) {
        return User.find({
          _id: { $ne: this._id },
          email: value
        })
          .then(users => {
            if (users.length !== 0) {
              throw new Error('E-mail has been used to register')
            }
          })
          .catch(err => {
            throw err
          })
      },
      message: props => `Email ${props.value} has already been used!`
    }]
  },
  password: {
    type: String,
    required: [true, 'Please input your password'],
    minlength: [6, 'Please insert minimum 6 character for the password']
  }
});

userSchema.pre('save', function (next) {
  this.email = this.email.toLowerCase()
  this.password = bcrypt.hash(this.password)
  next()
})

const User = model('User', userSchema);

module.exports = User;