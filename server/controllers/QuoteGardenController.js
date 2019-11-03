const QuoteGarden = require('../apis/quoteGarden')

class QuoteGardenController {
    static get (req, res, next) {
        QuoteGarden({
            url: "/random",
            method: 'get'
        })
        .then(({data}) => {
            res.status(200).json(data)
        })
        .catch(next)
  }
}

module.exports = QuoteGardenController