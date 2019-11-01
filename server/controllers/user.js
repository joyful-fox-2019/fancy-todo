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
  }
}