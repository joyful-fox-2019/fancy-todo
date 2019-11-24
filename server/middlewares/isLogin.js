const verifyToken = require('../helpers/verifyToken')
const User = require('../models/user')

function isLogin (req, res, next) {
    const token = req.headers.token

    try {
        const decodedToken = verifyToken(token)
        req.LoggedUser = decodedToken

        const id = {
            _id: req.LoggedUser.id
        }

        User.findOne(id)
            .then(user => {
                if(user) {
                    next()
                } else {
                    throw {
                        status: 404,
                        msg: 'User not Found'
                    }
                }
            })
            .catch(next)
        
    } catch(err) {
        next(err)
    }
}   

module.exports = isLogin