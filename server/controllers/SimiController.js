const { simi } = require('../config/simi')

class SimiController {
    static chat(req,res,next) {
        let { text } = req.body
        simi({
          method: 'post',
          data: JSON.stringify({
            "utext": `${text}`,
            "lang": "en"
          })
        })
          .then(({ data }) => {
            res.status(200).json(data)
          })
          .catch(next)
    }
}

module.exports = SimiController