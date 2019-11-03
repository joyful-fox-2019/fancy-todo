`use strict`
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const errorHandler = require('./middlewares/errorHandler')
// untuk express
const express = require('express')
const app = express()
const port = process.env.port || 3000
// router untuk user
const router = require('./routes')

// untuk mongoose
const mongoose = require('mongoose')
const morgan = require('morgan')

// untuk cors
const cors = require('cors')

// connect to express
app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(cors())
app.use(morgan('dev'))
// connect to mongoose
mongoose.connect('mongodb://localhost/project_week1', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false, useCreateIndex: true })
    .then(resolve => {
        console.log(`server is connected !!`)
    })
    .catch( err => {
        console.log(err)
    })



// router untuk user
app.use('/', router)
app.use(errorHandler)
// app.listen(port, () => {
//     console.log(`running on port ${port}`)
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))




