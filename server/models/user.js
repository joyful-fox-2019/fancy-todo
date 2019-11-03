const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name cannot be empty']
    },
    email:{
        type: String,
        unique: [true, 'Your email has been registered'],
        required: [true, 'Email cannot empty'],
        validate:{
            validator:(value)=>{
                // email must at standard email format
                let isEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                let valid = isEmail.test(value)
                if(valid){
                    return true;
                }else{
                    return false;
                }
            },
            message: `Your email is not valid`
        }
    },
    password:{
        type: String,
        required: [true, 'Password cannot empty'],
        minlength: [6, 'Minimal password is 6 digits']
    }
},
{
    versionKey: false
})

const User = mongoose.model('User', userSchema);

module.exports = User;