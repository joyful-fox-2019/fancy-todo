let jwt = require('jsonwebtoken');

module.exports = (user) => {
    console.log(user.email, user._id)
    let encoded =  jwt.sign({email : user.email , _id : user._id}, process.env.JWT_SECRET)    
    return encoded
}