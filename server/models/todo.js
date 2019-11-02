const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const todoSchema = new Schema({
    name: {
        type: String,
        required: [true, `Name is required.`],
        minlength: [3, `Minimal name length is 3.`]
    },
    description: {
        type: String,
        required: [true, `Description is required.`]
    },
    due_date: {
        type: Date
        // required: [true, `Due Date is required.`]
    },
    status: {
        type: Boolean,
        default: false
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

todoSchema.pre("save", function () {
    if (this.due_date < Date.now()) {
        this.due_date = Date.now()
    }
});

const Todo = model("Todo", todoSchema);

module.exports = Todo;