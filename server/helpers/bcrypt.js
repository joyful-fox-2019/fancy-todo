const bcrypt = require('bcrypt')

function generateHash(password){
  return bcrypt.hashSync(password,5)
}

function decodeHash(password,hash){
  return bcrypt.compareSync(password,hash)
}

module.exports = {
  generateHash,
  decodeHash
}