if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')

const app = express()
const PORT = 3000 || process.env.PORT

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true})
    .then(() => {
        console.log('Mongoose is successfully connected')
    })
    .catch(console.log)

app.use(errorHandler)
app.use('/', routes)

app.listen(PORT, () => {
    console.log(`App is listening to the PORT ${PORT}`)
})
