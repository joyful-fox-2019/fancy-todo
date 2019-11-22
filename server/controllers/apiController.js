const axios = require('axios')

class ApiController {
  static get(req, res, next) {
    axios({
      method: 'get',
      url: `http://api.airvisual.com/v2/nearest_city?key=${process.env.API_KEY}`
    })
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = ApiController