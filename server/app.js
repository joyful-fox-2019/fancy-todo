if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const mongoose = require('mongoose')
const express = require('express')
const app = express()
const uris = 'mongodb://localhost:27017/fancy-todo'
const port = process.env.PORT || 3000
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use('/todos', router)
app.use(errorHandler)

mongoose.connect(uris, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('db connected')
    })
    .catch(() => {
        console.log('db disconnected'); 
    })
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

app.listen(port, () => {
    console.log('listening port ', port);
    
})