const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

function verify(req,res,next) {
    console.log('verifiying')
    client.verifyIdToken({
        idToken: req.headers.id_token,
        audience: process.env.CLIENT_ID
    })
        .then((ticket) => {
            console.log('verified')
            const payload = ticket.getPayload()
            req.payload = payload
            next()
        }).catch(next)
}

module.exports = verify