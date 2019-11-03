'use strict'

const { Schema, model } = require('mongoose');
const bcrypt = require('../helpers/bcrypt')

const userSchema = new Schema ({
  name : {
    type: String,
    required: [true, 'Please input your name']
  },
  email: {
    type: String,
    required: [true, 'Please input your email address'],
    validate: {
      validator: function (v) {
        let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
        return emailRegex.test(v)
      },
      message: props => `${props.value} is not a valid email address`
    }
  },
  password: {
    type: String,
    required: [true, 'Please input your password']
  }
});

userSchema.post('validate', (doc, next) => {
  doc.password = bcrypt.hash(doc.password)
  next()
})

const User = model('User', userSchema);

module.exports = User;