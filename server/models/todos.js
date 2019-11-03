const mongoose = require("mongoose")
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name: {
        type : String,
        required: [true,'Todo required']
    },
    description : String,
    due_date : {
        type : Date,
        required: [true,'Todo required']
    },
    status : {type : Boolean, default : false},
    user_id : {type : Schema.Types.ObjectId, ref : "User"}
})

const Todo = mongoose.model("todo",todoSchema)
module.exports = Todo 