const {Schema, model} = require('mongoose');
const hashHelper = require('../helpers/hashHelper');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter your email address'],
        validate:{
            validator: function (value) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: props => `Please enter a valid email address`
        }
    },
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        minlength: [6, 'Username minimum length is 6 characters'],
        maxlength: [20, 'Username maximum length is 20 characters']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Password minimum length is 6 characters'],
    },
    picture:{
        type: Buffer,
        default: null
    }
}, {
    timestamps: true
})

userSchema.pre('save', function(next){
    this.password = hashHelper.hash(this.password);
    next();
})

const User = model('User', userSchema);

module.exports = User;