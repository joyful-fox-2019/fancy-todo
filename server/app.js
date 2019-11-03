if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const routes = require('./routes')
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use('/', routes)

mongoose.connect('mongodb://localhost:27017/fancy-todo', { useNewUrlParser: true , useUnifiedTopology: true}, function(err){
    if(err){
        console.log(err)
    }else{
        console.log('Success to connect database')
    }
})

app.listen(PORT, ()=>{
    console.log(`server sonnected to port ${PORT}`)
})