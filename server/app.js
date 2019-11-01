if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const routers = require('./routers')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

mongoose.set('runValidators', true)
mongoose.connect(process.env.MONGOOSE_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  err => {
  if(err) {
    console.log('db connection failed')
  } else {
    console.log('db connected')
  }
})

app.use('/', routers)
app.use(errorHandler)

app.listen(PORT, console.log(`listening on port ${PORT}`))