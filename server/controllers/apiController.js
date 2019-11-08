const axios = require('axios')

class ApiController {
  static get(req, res, next) {
    axios({
      method: 'get',
      url: 'http://api.airvisual.com/v2/nearest_city?key=e6717641-5f08-4096-b2b5-17147c6fc908'
    })
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = ApiController