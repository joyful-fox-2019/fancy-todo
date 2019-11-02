if (process.env.NODE_ENV === "development") {
    console.log("masuk");
    require('dotenv').config()
}

const express = require('express')
const routes = require('./routes')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const { errorHandler } = require('./middlewares/errorHandler')
const cors = require('cors')

mongoose.connect(process.env.URL_DB, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    console.log(`connect`);
    if (err) console.log(err, 'failed connect to database')
    else console.log('Todo connect to mongodb')
})
mongoose.Promise = global.Promise
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log('fancy-todo server is running on port ' + PORT)
})