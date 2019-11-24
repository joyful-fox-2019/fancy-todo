const validate = require('mongoose-validator')

let isEmailValidation = [
    validate({
        validator: 'isEmail',
        message: 'invalid email format'
    })
]

let passwordValidation = [
    validate({
        validator: 'matches',
        arguments: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/,
        message: 'password shold contain at least one digit, one lower case , one upper case , minumum 6 char'
    })
]

let todoValidationTitle = [
    validate({
        validator: 'isLength',
        arguments: [1,14],
        message: 'Title max 14 char'
      }),
]

let todoValidationDesc = [
    validate({
        validator: 'isLength',
        arguments: [1,50],
        message: 'Desc max 50 char'
      }),
]

module.exports = { isEmailValidation,passwordValidation,todoValidationTitle,todoValidationDesc }