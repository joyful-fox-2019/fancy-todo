const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const ObjectId = Schema.Types.ObjectId;
const axiosInstance = require('../api/quote');

const todoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean
    },
    due: {
        type: Date
    },
    quote: {
        type: {}
    },
    user: {
        type: ObjectId,
        ref: 'User'
    }
})

todoSchema.pre('save', function (next) {
    axiosInstance.get('')
        .then(respone => {
            // console.log(respone.data);
            this.status = false;
            this.quote = {
                content: respone.data.content,
                author: respone.data.author
            }
            next()
        })
        .catch(err => {
            next(err);
        })
})

const Todo = model('Todo', todoSchema);
module.exports = Todo;