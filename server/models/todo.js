const mongoose = require("mongoose")

const Schema = mongoose.Schema

const TodoSchema = new Schema({
    name : {type : String, required : [true, "name is required"]},
    description : {type : String, default : 'no description'},
    status : {type : Boolean, default : false},
    dueDate : {type : String, required : [true, "due date is required"]}
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo