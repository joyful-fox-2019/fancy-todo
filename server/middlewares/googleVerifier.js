const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function googleVerify (req, res, next) {
    console.log(req.body.idToken);
    client.verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    })
    .then((ticket) => {
        const payload = ticket.getPayload();
        req.user = {
            name: payload.name,
            email: payload.email
        };
        next();
    })
    .catch((err) => {
        next(err);
    });
}

module.exports = googleVerify;