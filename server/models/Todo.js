const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: Boolean
    },
    dueDate: {
        type: Date
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
});

todoSchema.pre('save', function(next) {
    this.status = false;
    next();
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;