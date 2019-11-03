'use strict'

const User = require('../models/user')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    let { name, email, password } = req.body
    let userData = { name, email, password }
    User.findOne({ email })
      .then(user => {
        if (user) {
          let err = new Error('Email is already in use')
          err.name = 'emailnotunique'
          throw err
        } else {
          return User.create(userData)
        }
      })
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        next(err)
      })
  }
  static login(req, res, next) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if(!user) {
          throw new Error('User is not found')
        }
        let isCorrect = bcrypt.compare(req.body.password, user.password)
        if (user && isCorrect) {
          let access_token = jwt.generate({ id: user._id, email: user.email })
          res.status(200).json({
            access_token,
            name: user.name,
            isLogin: true
          })
        } else {
          let err = new Error('Email or Password is incorrect')
          err.name = 'incorrect'
          next(err)
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static googleLogin(req, res, next) {
    let { name, email } = req.decoded
    User.findOne({ email })
      .then(user => {
        if (user) {
          return user
        } else {
          return User.create({
            name,
            email,
            password: 'default'
          })
        }
      })
      .then(user => {
        let access_token = jwt.generate({ id: user._id, email: user.email })
        res.status(200).json({
          access_token,
          name: user.name,
          isLogin: true
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController