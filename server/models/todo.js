const mongoose = require('mongoose')
const { Schema } = mongoose

let TodoSchema = new Schema({
    title : {
        type : String,
        required : [true, 'Name is required!']
    },
    description : {
        type : String,
        required : [true, 'Description is required!']
    },
    status : {
        type : Boolean
    },
    createdAt:{
        type : Date
    },
    due_date : {
        type : Date,
        required : [true, 'due_date is required!']
    },
    UserId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    bookmark : []
})

TodoSchema.pre('save',function(next){
    this.status = false
    this.createdAt = new Date().toISOString()
    next()
})

module.exports = mongoose.model('Todo',TodoSchema)