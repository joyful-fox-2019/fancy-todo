const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://api.quotable.io/random'
})

module.exports = instance;