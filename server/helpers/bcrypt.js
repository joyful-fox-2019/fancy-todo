const bcrpyt = require('bcryptjs')
const salt = bcrpyt.genSaltSync(10)

function getHash(password){
  return bcrpyt.hashSync(password,salt)
}

function compareHash(password,hash){
  return bcrpyt.compareSync(password,hash)
}

module.exports = {getHash,compareHash}