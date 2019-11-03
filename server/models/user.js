const encode = require("../helpers/hashPassword.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, `Email address is required.`],
        match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, `Invalid email format.`],
        validate: {
            validator: function (v) {
                return User.findOne({
                    email: v
                })
                .then( (user) => {
                    if (user) return false;
                    else return true;
                });
            }, message: `Email must be unique.`
        }
    },
    password: {
        type: String,
        required: [true, `Password is required.`]
    }
},{
    timestamps: true
});

userSchema.pre("save", function (next) {
    this.password = encode.hash(this.password);
    next();
})

const User = model("User", userSchema);

module.exports = User;