const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

module.exports = (req, res, next) => {
  client.verifyIdToken({
    idToken: req.body.idToken,
    audience: process.env.CLIENT_ID,
  })
    .then(ticket => {
      let payload = ticket.getPayload()
      req.decoded = payload
      next()
    })
    .catch(err => {
      next(err)
    })
}