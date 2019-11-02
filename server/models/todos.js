const mongoose = require("mongoose")
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name: String,
    description : String,
    due_date : String,
    status : {type : Boolean, default : false},
    user_id : {type : Schema.Types.ObjectId, ref : "User"}
})

const Todo = mongoose.model("todo",todoSchema)
module.exports = Todo