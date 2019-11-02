const mongoose = require("mongoose")
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name: String,
    description : String,
    deadline : String,
    status : {type : Boolean, default : false}
})

const Todo = mongoose.model("todo",todoSchema)
 
module.exports = Todo