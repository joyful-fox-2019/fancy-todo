const bcrypt = require('bcryptjs')

const hashPassword = (password) => {
  let salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

const compare = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
  hashPassword,
  compare
}
