const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('../helpers/bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        required: [true, 'Email address is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String
    },
    isGoogleAccount: {
        type: Boolean
    }
},{
    timestamps: true
});

userSchema.pre('save', function(next) {
    this.password = bcrypt.generatePassword(this.password);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;