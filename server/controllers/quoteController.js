const axios = require('axios');

module.exports = {
  getRandom (req, res, next) {
    const { username } = req.loggedUser
    axios({
      method: 'get',
      url: 'https://quote-garden.herokuapp.com/quotes/random'
    })
      .then(({data}) => {
        res.status(200).json({
          username,
          data
        })
      })
      .catch(next)
  }
}