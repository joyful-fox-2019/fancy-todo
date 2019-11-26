const axios = require('axios')

const axiosFlight = axios.create({
  baseURL: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0`,
  headers: {
    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    "x-rapidapi-key": `${process.env.FLIGHT_KEY}`
  }
})

module.exports = {
  axiosFlight
}
