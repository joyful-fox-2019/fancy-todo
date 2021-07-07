if (process.env.NODE_ENV === 'development'){
  require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes')
const errorHandling = require('./middlewares/errorHandler')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// mongoose.connect('mongodb://localhost:27017/myfancyTodo', {useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true},()=>{
//   console.log('connected on myfancyTodo')
// })

mongoose.connect(process.env.MONGO_ATLAS,{useNewUrlParser:true,useUnifiedTopology:true})
  .then(()=>{
    console.log('connectedOnAtlas')
  })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));

app.use(morgan('dev'))
app.use(cors())


app.use('/',routes)

app.use(errorHandling)


app.listen(PORT, ()=>{
  console.log(`up and running on ${PORT}`);
})