const mongoose = require('mongoose')
const uri = process.env.MONGO_URI

mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology:true})
  .then(() => { console.log('Connected to database')})
  .catch(err=> { console.log('Failed to connect to database')})


module.exports = mongoose