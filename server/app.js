if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')

const errorHandler = require('./middlewares/errorHandler')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/', routes)
app.use(errorHandler)

mongoose.connect('mongodb://localhost:27017/fancy-todo', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false
 })

app.listen(port, () => {
  console.log(`listening to port`, port)
})