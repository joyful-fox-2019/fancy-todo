const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

module.exports = {
  hashPass: (password) => {
    return bcrypt.hashSync(password, salt)
  },
  comparePass: (password, hashed) => {
    return bcrypt.compareSync(password, hashed)
  }
}