process.env.NODE_ENV == 'development' ? require('dotenv').config() : ''
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cors())
mongoose.connect('mongodb://localhost:27017/fancy-todo',{
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser:true
},(err=>{
    err ? console.log('connect to mongodb failed!') : console.log('connect to mongodb success! congratz');
}))

app.use('/',routes)
app.use(errorHandler)

app.listen(port,(()=>{
    console.log(`listen to port`,port);
}))