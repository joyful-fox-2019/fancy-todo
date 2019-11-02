require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const routers = require('./routers')
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))
app.use(cors())

const mongooseConfig = {
    useNewUrlParser:true, 
    useFindAndModify: false, 
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect(process.env.MONGOOSE_URL, mongooseConfig, (err) => {
    if(err) console.log(err)
    console.log('database connected')
})

app.use('/', routers)
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`you're listening to ${PORT}`)
})