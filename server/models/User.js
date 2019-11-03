const mongoose = require('mongoose')

const {hashPassword} = require('../helpers/bcryptjs')
const { isEmailValidation,passwordValidation } = require('../helpers/validator')
const Schema = mongoose.Schema



const userSchema = new Schema ({
    name: {type:String,required:[true,'name is required']},
    email: {type:String,required:[true,'email is required'],validate:isEmailValidation,unique:true},
    password: {type:String,required:[true,'password is required'],validate: passwordValidation}
},{timestamps:true,versionKey: false})

userSchema.pre('save',function(next){
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User