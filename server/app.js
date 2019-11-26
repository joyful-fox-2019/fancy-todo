const dotenv = () => {
  if(process.env.NODE_ENV==='development') {
    require('dotenv').config()
  }
}
dotenv()
require('./config/mongoConnect')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')


app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, ()=> { console.log(`this app is running on ${PORT}`)})