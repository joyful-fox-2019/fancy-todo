const axios = require("axios")

const instance = axios.create({
    baseURL: `https://calendarific.com/api/v2/`,
    headers: {
        'Accept': 'application/json'
      }
})

module.exports = instance
