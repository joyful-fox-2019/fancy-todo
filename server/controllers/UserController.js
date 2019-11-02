const User = require('../models/User')
const { generateToken } = require('../helpers/jwt')
const { compare } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')
const WeatherAPI = require('../apis/WeatherAPI')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class UserController {
    static register (req, res, next) {
        let { name, email, password } = req.body
        User.create({
            name,
            email,
            password
        })
        .then (result => {
            res.status(201).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static login (req, res, next) {
        let { email, password } = req.body
        let err
        let token
        User.findOne({
            email
        })
        .then (result => {
            if (compare(password, result.password)) {
                token = generateToken({
                    _id: result._id
                })
                res.status(200).json({token})
            } else {
                err = new Error('password salah')
                err.name = 'PasswordError'
                next(err)
            }
        })
        .catch (err => {
            next(err)
        })
    }

    static googleLogin (req, res, next) { 
        let payload
        let token
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then (ticket => {
            payload = ticket.getPayload()
            return User.findOne({
                email: payload.email
            })
        })
        .then (result => {
            if (result) {
                token = generateToken({
                    _id: result._id
                })
                res.status(200).json({token})
            } else {
                return User.create({
                    email: payload.email,
                    name: payload.name,
                    password: payload.name
                })
            }
        })
        .then (result => {
            token = generateToken({
                _id: result._id
            })
            res.status(200).json({token})
        })
        .catch (err => {
            next(err)
        })
    }

    static findAllUser (req, res, next) {
        User.find()
        .then (result => {
            res.status(200).json({ result })
        })
        .catch (err => {
            next(err)
        })
    }

    static findWeather (req, res, next) {
        WeatherAPI({
            url:`/weather?q=${req.params.city},id&appid=${process.env.WEATHER_API_KEY}`,
            method: 'get'
        })
        .then (({ data }) => {
            res.status(200).json(data)
        })
        .catch (err => {
            next(err)
        })
    }
}

module.exports = UserController