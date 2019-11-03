module.exports = function(req, res, next) {
    try {
        const jwt = require('jsonwebtoken');

        let token = req.headers['authorization']
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.decoded = decoded;
        next();
      } catch(err) {
        res.status(401).json(err);
      }
}