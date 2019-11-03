if(process.env.NODE_ENV==='development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')



app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/',router)

mongoose.connect(process.env.MONGOOSE_URL,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex: true})
.then(_=>{console.log('mongoose connected')})
.catch(console.log)
app.use(errorHandler)

app.listen(PORT,_=>{console.log(`listening on port ${PORT}`)})
