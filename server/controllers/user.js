const User = require('../models/User')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcryptjs')

module.exports = {
  register: (req, res, next) => {
    const { email, password } = req.body
    User.create({ email, password })
    .then(user => {
      const id = user._id
      const access_token = generateToken({ id })
      const { email, password } = user
      res.status(200).json({ _id: id, email, password, access_token })
    })
    .catch(next)
  },
  login: (req, res, next) => {
    const { email, password } = req.body
    User.findOne({ email })
    .then(user => {
      if(!user || !comparePassword(password, user.password)) {
        throw {status: 400, msg: 'Wrong username/password'}
      } else {
        const id = user._id
        const access_token = generateToken({ id })
        const { email, password } = user
        res.status(200).json({ _id: id, email, password, access_token })
      }
    })
    .catch(next)
  },
  googleSignIn: (req, res, next) => {
    User.findOne({
      email: req.googleEmail
    })
    .then(user => {
      if(!user) {
        return User.create({
          email: req.googleEmail,
          isGoogle: true
        })
      } else {
        return user
      }
    })
    .then(user => {
      const access_token = generateToken({
        id: user._id,
        email: user.email
      })
      res.status(200).json({ access_token })
    })
    .catch(next)
  },
  find: (req, res, next) => {
    User.find()
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  }
}