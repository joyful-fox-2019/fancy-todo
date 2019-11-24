if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true, useUnifiedTopology: true, 
  useCreateIndex: true, useFindAndModify: false
})
  .then(success => {
    console.log(`connected to mongodb`)
  })
  .catch(err => {
    console.log(`cannot connect to mongodb`)
  })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./routes'))
app.use(require('./middlewares/errorHandler'))

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})
