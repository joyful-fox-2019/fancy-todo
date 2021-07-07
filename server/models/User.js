const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {getHash} = require('../helpers/bcrypt')

const user = new Schema({
  username : {
    type : String,
    required : [true,'username is required']
  },
  email : {
    type : String,
    required : [true,'email is required'],
    match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email format is invalid']
  },
  password : {
    type : String,
    required : [true, 'password is required']
  },
  todos : [{
    type : Schema.Types.ObjectId,
    ref : 'Todo'
  }],
  project : {
    type : Schema.Types.ObjectId,
    ref : 'Project'
  },
  OAuth : {
    type : Boolean,
    default : false
  }
},{
  timestamps : true
})

user.pre('save',function(next){
  this.password = getHash(this.password)
  next()
})



const User = mongoose.model('User',user)
module.exports = User