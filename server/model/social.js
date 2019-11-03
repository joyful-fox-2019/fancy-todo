const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const socialSchema = new Schema({
    todoId:{
        type: ObjectId,
        ref: 'Todo'
    },
    userId: {
      type: ObjectId,
      ref: 'User'
    },
    upvotes: [
        {
          type: ObjectId,
          ref: 'User'
        }
      ],
    downvotes: [
        {
          type: ObjectId,
          ref: 'User'
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model('Social', socialSchema)