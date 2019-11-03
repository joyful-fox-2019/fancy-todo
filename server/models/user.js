const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    full_name : {
        type : String,
        required: [true,'name is required required']
    },
    username : {
        type : String,
        required: [true,'username required']
    },
    email : {
        type : String,
        required: [true,'email must be included'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email format invalid']
            },
      password : {
        type : String,
        required: [true,'password must be included']
            },
    })


const User = mongoose.model("User", UserSchema)

module.exports = User