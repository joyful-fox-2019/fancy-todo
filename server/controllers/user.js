const User = require('../models/user')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController{
  static findUser(req, res, next) {
    let { username } = req.params
    let userName = new RegExp(username)
    User.find({ username: userName })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  }

  static regiser(req, res, next) {
    let { username, email, password } = req.body
    User.create({
      username, email, password
    })
      .then(user => {
        const token = generateToken({ _id: user._id })
        res.status(201).json({
          token,
          username: user.username,
        })
      })
      .catch(next)
  }

  static login(req, res, next) {
    let { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        if (user && comparePassword(password, user.password)) {
          let payload = { _id: user._id }
          let token = generateToken(payload)
          res.status(200).json({
            token,
            username: user.username
          })
        } else {
          let err = new Error('Wrong Email / Password')
          err.name = 'AuthenticationError'
          next(err)
        }
      })
  }

  static changeName(req, res, next) {
    let { username, newUsername } = req.body
    User.findOneAndUpdate({ username }, {$set: {username: newUsername} })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static googleSignIn(req, res, next) {
    const { OAuth2Client } = require('google-auth-library')
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
    const client = new OAuth2Client(GOOGLE_CLIENT_ID)
    const { token } = req.body
    let data;

    client.verifyIdToken({ idToken: token, audience: GOOGLE_CLIENT_ID })
      .then(ticket => {
        data = ticket.getPayload()
        let email = data.email
        return User.findOne({ email })
      })
      .then(user => {
        if (user) {
          return user
        } else {
          return User.create({
            email: data.email,
            username: data.name,
            password: process.env.DEFAULT_PASSWORD
          })
        }
      })
      .then(user => {
        let payload = { _id: user._id }
        let token = generateToken(payload)
        res.status(200).json({
          token,
          username: user.username
        })
      })
      .catch(next)
  }
}

module.exports = UserController