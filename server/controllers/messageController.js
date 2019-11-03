const Message = require('../models/message')
const User = require('../models/user')

class messageController {
    static create(req, res, next) {
        const createdData = {
            content: req.body.content,
            from: req.LoggedUser.name
        }

        let message_id = null

        Message.create(createdData)
            .then(message => {
                message_id = message._id
                return User.findByIdAndUpdate(req.params.id, {
                    $push: {
                        inbox: message_id
                    }
                })
                    .then(user => {
                        res.status(200).json({
                            msg: 'Message is sent'
                        })
                    })
                    .catch(next)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const id = req.params.id

        Message.findByIdAndDelete(id)
            .then(message => {
                return User.findByIdAndUpdate(req.LoggedUser.id, {
                    $pull: {
                        inbox: id
                    }
                })
                    .then(user => {
                        res.status(200).json({
                            msg: 'Message is deleted'
                        })
                    })
                    .catch(next)
            })
            .catch(next)
    }

}

module.exports = messageController