const bcrypt = require('bcryptjs')
let salt = bcrypt.genSaltSync(10)

function generateHash(password) {
  let hash = bcrypt.hashSync(password, salt)
  return hash
}

function verifyHash(password, hash) {
  return bcrypt.compareSync(password, hash)
}

module.exports = { generateHash, verifyHash }