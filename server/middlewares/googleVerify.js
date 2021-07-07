const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = (req, res, next) => {
    client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket=>{
        req.decoded = ticket.getPayload();
        next();
    })
    .catch(err=>{
        res.status(500).json(err);
    })
}