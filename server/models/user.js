const mongoose = require("mongoose")
const {hashPassword} = require("../helpers/bcryptjs")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email : {type : String, required : [true, "email is required"]},
    password : {type : String, required : [true, "password is required"], minlength : [6, "less than 6 characters"]},
    todoList : [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
})

UserSchema.pre('save', function(next){
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User', UserSchema)

UserSchema.path('email').validate(function(email){
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email)
  },'please write a correct email')

UserSchema.path('email').validate(function(email){
  return User.findOne({
    email : email
  })
  .then(function(data){
    if(data){
      return false
    }else{
      return true
    }
  })
},'email already registered')

module.exports = User