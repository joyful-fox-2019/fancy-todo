const mongoose = require('mongoose')
const url = process.env.MONGOOSE_URL
// const url = 'mongodb://localhost:27017/fancy-todo-dev'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(_ => console.log('connected to mongoose'))
    .catch(err => console.log(err))