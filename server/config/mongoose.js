const mongoose = require('mongoose')
const MONGO_CONNECT = process.env.MONGO_CONNECT

mongoose.connect(MONGO_CONNECT, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`Mongoose Connect Successfuly`)
    })
    .catch(err => {
        console.log(err)
        console.log(`Mongoose Connect Fail`)
    })

module.exports = mongoose