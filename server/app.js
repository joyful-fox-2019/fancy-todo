//Require-dotenv
const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'development') {
  require('dotenv').config()
}
//Require-Variabel
const express = require('express')
var mongoose = require('mongoose');
const cors = require('cors')
const route = require('./routes/index')
const errorHandler = require('./middlewares/errHandler')

const app = express()
const PORT = process.env.PORT || 3000

//Mongoose-Connection
mongoose.connect('mongodb://localhost/todos-fancy', { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are Connected to MongoDb')
});

//Require-app-use
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

//app-use-Router
app.use('/',route)

//app-use-errorHandler
app.use(errorHandler)

//app-listen
app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
