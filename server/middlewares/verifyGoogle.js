const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

module.exports = ((req,res,next)=>{
    client.verifyIdToken({
        idToken  : req.body.id_token,
        audience : process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket=>{
        const payload = ticket.getPayload()
        req.decoded = payload
        next()
    })
    .catch(err=>{
        next(err)
    })
})