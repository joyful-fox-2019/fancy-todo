const {OAuth2Client} = require('google-auth-library'); // harus kita intall lewat npm
const client = new OAuth2Client(process.env.CLIENT_ID); // ini kita simpan dari env

module.exports = (req, res, next) => {
    client.verifyIdToken({
        idToken: req.body.google_token, // ini data yang dikirim saat klik sign in di index.html
        audience: process.env.CLIENT_ID,  // ini ngambil dari env       
    })
    .then( ticket => {
        const payload = ticket.getPayload();
        req.decoded = payload  
        next()  
    })
    .catch(err => {
        console.log(err)
    })
    
    
}