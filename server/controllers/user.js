const User = require('../models/user')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register (req, res, next) {
    const { name, email, password } = req.body
    User
      .create({
        name,
        email,
        password
      })
      .then(result => {
        const payload = {
          _id: result._id,
          name: result.name,
          email: result.email
        }
        const token = generateToken(payload)
        res.status(201).json({
          token,
          name: result.name
        })
      })
      .catch(next)
  }
  static login (req, res, next) {
    const { email, password } = req.body
    User
      .findOne({
        email
      })
      .then(result => {
        if (result && comparePassword(password, result.password)) {
          const payload = {
            _id: result._id,
            name: result.name,
            email: result.email
          }
          const token = generateToken(payload)
          res.status(200).json({
            token,
            name: result.name
          })
        } else {
          next({
            status: 401,
            message: 'invalid username/password'
          })
        }
      })
      .catch(next)
  }
  static googleSignIn (req, res, next) {
    User
      .findOne({
        email: req.decoded.email
      })
      .then(user => {
        if (user) {
          return user
        } else {
          return User
            .create({
              name: req.decoded.name,
              email: req.decoded.email,
              password: process.env.DEFAULT_PASSWORD
            })
        }
      })
      .then(result => {
        const payload = {
          _id: result._id,
          name: result.name,
          email: result.email
        }
        const token = generateToken(payload)
        res.status(200).json({
          token,
          name: result.name
        })
      })
      .catch(next)
  }
}

module.exports = UserController
