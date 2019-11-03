const {
    Schema,
    model
} = require('mongoose')
const {
    hash
} = require('../helpers/bcrypt')

const userSchema = new Schema({
    full_name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        require: [true, 'Please enter your email'],
        validate: [{
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },
            message: props => `${props.value} is not a valid email`
        }, {
            validator: function (email) {
                return User.findOne({
                        email: email
                    })
                    .then(member => {
                        if (!member) {
                            return true
                        } else {
                            throw {
                                message: 'Email address is already registered'
                            }
                        }
                    })
            }
        }]
    },
    password: {
        type: String,
        require: [true, 'Please enter your password'],
        minlength: [7, 'Minimum password length is 7']
    }
})

userSchema.pre('save', function (next) {
    this.password = hash(this.password)
    this.full_name = this.email.match(/^([^@]*)@/)[1]
    next()
})

const User = model('User', userSchema)

module.exports = User