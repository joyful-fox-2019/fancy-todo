if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',routes)
mongoose.connect(process.env.URL_MONGOOSE, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true})
    .then(_=> {
        console.log("mongoodb successfully connect");
    })
    .catch(console.log)

app.use(errorHandler)

app.listen(PORT,_=>{console.log(`listening on port ${PORT}`)})