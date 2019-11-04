const mongoose = require('mongoose')
const {hashPassword} = require('../helpers/bcryptjs')

let Schema = mongoose.Schema

let userSchema = new Schema({
    username: {
      type:String,
      required: [true, 'username is required']
    },
    email: {
      type:String,
      required: [true, 'email is required'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid Email Format'],
      unique:true
    },
    password: {
      type:String,
      required: [true, 'password is required'],
      minlength: [6, 'Password Minimum Contain 6 Character']
    }
}, 
{
  timestamps:true,
  versionKey: false
})

userSchema.pre('save',function(next){
    this.password = hashPassword(this.password)
    next()
})

userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next({status:401,message:'Email is Already Exist'});
    } else {
      next(error);
    }
});

let User = mongoose.model('User',userSchema)

module.exports = User