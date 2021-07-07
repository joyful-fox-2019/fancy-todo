const {Schema, model} = require('mongoose');

const todoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: 'no description'
    },
    status: {
        type: String,
        default: 'pending'
    },
    due_date: {
        type: Date,
        required: true,
        validate:{
            validator: function(v){
                return (new Date(v) >= new Date())
            },
            message: props => `Please don't enter past date`
        }
    },
    UserId: { 
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

const Todo = model("Todo", todoSchema);

module.exports = Todo;