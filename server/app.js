if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const express = require('express')
const app = express()

const routes = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')

const PORT = process.env.PORT 
mongoose.connect('mongodb://localhost:27017/next!', { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true })
.then(() => {
  console.log(`Server connected`);  
})
.catch(err => {
  console.log(`Failed to connect to server`);
  
})

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/', routes)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Listening on PORT`, PORT))