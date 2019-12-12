const {
    OAuth2Client
} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


module.exports = (req, res, next) => {
    try {
        client.verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(ticket => {
                const payload = ticket.getPayload()
                req.decoded = {
                    email: payload.email,
                    name: payload.given_name
                }
                next()
            })
    } catch (err) {
        throw err
    }
}