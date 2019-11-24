const bcrypt = require('bcryptjs')

module.exports = {
  hash: (password) => {
    let salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  },
  compare: (input, database) => {
    return bcrypt.compareSync(input, database)
  }
}