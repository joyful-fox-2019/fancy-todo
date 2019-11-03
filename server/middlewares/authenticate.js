const verifyJwt = require('../helpers/verifyJwt') // ini dugunaka buat men-decoded token
const User = require('../models/user')
module.exports = (req, res, next) => {
    try {        
        let user = verifyJwt(req.headers.token)
        // masukkan data yang telah diencoded
        User.findOne({
            _id : user._id // cari apakah data dia ada di server
        })
        .then (user => {
            if (user) {
                req.user = user // kalo ada maka simpan user di req.user
                next()
            } else {
                next({
                    name : 'DataError' //kalau tidak ada maka harus login lagi
                })
            }
            
        })     
        
    } catch(err) {  
        next(err)    
    }
}