const User = require('../models/user')
const { comparePassword } = require('../helpers/bcryptjs')
const { tokenGenerate } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')


class UserController {
  static register(req, res, next) {
    const { name, email, password } = req.body
    User.create({ name, email, password })
      .then(user => {
        let payload = {
          id: user._id
        }
        let token = tokenGenerate(payload)
        res.status(201).json({ token, username: user.name })
      })
      .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        if (user && comparePassword(password, user.password)) {
          let payload = {
              id: user._id
          }

          let token = tokenGenerate(payload)
          res.status(200).json({ token, username: user.name })
        } else {
            next({
              status: 400,
              message: `Invalid Email/Password`
            })
          }
        })
        .catch(next)
  }

  static loginGoogle(req, res, next) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    let payload = null;
    client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket => {
        payload = ticket.getPayload()
        return User.findOne({
            email: payload.email
        })
      })
      .then(user => {
        if (user) {
          return user
        } else {
          return User.create({
            name: payload.name,
            password: process.env.PASSWORD_USER,
            email: payload.email,
          })
        }
      })
      .then(user => {
        const token = tokenGenerate({
          id: user._id
        })
        res.status(201).json({ token, username: user.name})
      })
      .catch(next)
  }
}

module.exports = UserController