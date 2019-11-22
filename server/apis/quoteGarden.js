const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://quote-garden.herokuapp.com/quotes'
})

module.exports = instance