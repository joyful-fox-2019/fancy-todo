const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID);

async function verify(req,res,next) {
  try{
    const ticket = await client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.CLIENT_ID,
    });
    req.googleData = ticket.getPayload();
    next()
  }
  catch(err){
    console.log(err)
    res.status(err.status || 400).json(err)
  }
}

module.exports = verify