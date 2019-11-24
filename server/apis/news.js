const axios = require('axios')

module.exports = axios.create({
    baseURL: `https://newsapi.org/v2`,
})