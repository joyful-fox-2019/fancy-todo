
if(process.env.NODE_ENV === "development"){
    require("dotenv").config()
}

const express = require('express')
const app = express()
const routes = require('./routes')
const port = 3000
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/fancy-to-do',({ useNewUrlParser: true, useUnifiedTopology: true }),(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('successfully connected to mongodb')
    }
})

app.use(cors())
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use('/', routes)


//kalau pakai router => app.use('/routerlink',router)
app.listen(port,()=>{
console.log(`listening from port`,port)
})