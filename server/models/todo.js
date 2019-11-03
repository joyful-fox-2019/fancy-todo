const { Schema, model } = require('mongoose')
const hashPassword = require('../helpers/hashPassword')

const todoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'must fill the email'],
    },
    date : {
        type : Date,
        required : [true, 'must fill the password'],
    },
    isDone : {
        type : Boolean,
        default : false
    },
    date_done : {
        type : Date,
        default : null
    },
    user : {type : Schema.Types.ObjectId, ref: 'User' }
    
})

// userSchema.pre('save', function (next){ // disini tidak boleh pake arrow
//     this.password = hashPassword(this.password)
//     next() // wajib ada next di hooks
// })

const Todo = model('Todo', todoSchema)
module.exports = Todo