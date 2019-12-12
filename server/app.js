if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const PORT = process.env.PORT
const routes = require('./routes')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cors())
mongoose.connect('mongodb://localhost:27017/tesTodo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    console.log('connected mongoose')
})

app.use('/', routes)

app.use(errorHandler)


app.listen(PORT, () => console.log(`Server listening on port ${PORT
}`))