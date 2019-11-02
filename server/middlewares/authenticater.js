const User = require("../models/user.js");
const jwt = require("../helpers/jwtHandler.js");

function authenticate (req, res, next) {
    try {
        const decoded = jwt.verify(req.headers.jwt_token);
        User.findOne({
            email: decoded.email
        })
        .then((user) => {
            if (user) {
                req.user = decoded;
                next();
            } else {
                next(err);
            }
        });
    }
    catch (err) {
        err = {
            status: 403,
            messages: `You must log in first.`
        }
        next(err);
    }
}

module.exports = authenticate;