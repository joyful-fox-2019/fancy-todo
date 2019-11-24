if (process.env.NODE_ENV === 'development') require('dotenv').config()

const errorHandler = require('./middleware/errorHandler')
const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const morgan = require('morgan')

// connect to mongoose
require('./config/mongooseConnect')

const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// main routes
app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => console.log('listening to port ', PORT))