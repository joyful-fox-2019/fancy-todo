const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: [
            {
                validator: function (value) {
                    let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    return emailRegex.test(value);
                },
                message: props => `${props.value} is not a valid email!`
            },
            {
                validator: function (value) {
                    return this.model('User').findOne({ email: value })
                        .then(email => {
                            if (email) {
                                return false
                            } else {
                                return true
                            }
                        })
                },
                message: props => `${props.value} has already been used by another user`
            }
        ],
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
})


userSchema.pre('save', function(next){
    this.password = hash(this.password)
    next()
})


const User = mongoose.model('User', userSchema);

module.exports = User;