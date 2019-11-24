const mongoose = require('mongoose')
const Schema = mongoose.Schema

let messageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    }
})

let Message = mongoose.model('Message', messageSchema)

module.exports = Message