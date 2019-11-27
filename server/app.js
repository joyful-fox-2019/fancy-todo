if (process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

require('./config/mongoose')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const errorHandler = require('./middlewares/errorhandler')
const router = require('./routes/index')
const app = express()

app.use(cors())
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(morgan('dev'))

app.use('/', router)
app.use(errorHandler)

module.exports = app