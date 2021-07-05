const NODE_ENV = process.env.NODE_ENV

if(NODE_ENV === 'development' || NODE_ENV === 'test'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connection = process.env.CONNECTION
const PORT = process.env.PORT
const err = require('./middleware/errHandler')
const cors = require('cors')
const routes = require('./routes/index')

mongoose.connect(connection, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function(){
    console.log('Mongoose Connected');
})

app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)
app.use(err)

app.listen(PORT, () => {
    console.log(`Listening on port PORT ${PORT}`);
})