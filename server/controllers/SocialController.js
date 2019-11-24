const Social = require('../model/social')
const Todo = require('../model/todo')

class SocialController {

    static create(req, res, next){
        const todoId  = req.params.id
        const userId = req.decode.id
        Todo.findByIdAndUpdate(todoId, {share: true})
        .then(() => {
          return Social.create({ todoId, userId })
        })
        .then(social =>{
          res.status(201).json(social)
        })
        .catch(next)
    }

    static find(req, res, next){
        Social.find().populate('todoId').populate('userId')
            .then(socials =>{
                res.status(200).json(socials)
            })
            .catch(next)
    }

    static delete(req, res, next){
      const todoId  = req.params.id
        Todo.findByIdAndUpdate(todoId, {share: false})
          .then(()=>{
            return Social.findOneAndDelete({ todoId })
          })
          .then(()=>{
              res.status(200).json({
                  message: 'success remove from social media'
              })
          })
          .catch(next)
    }

    static upvote(req, res, next) {
        const userId = req.decode.id
        const id = req.params.id

        Social.findById(id)
          .then(social => {
            if (social) {
              let downvotes = social.downvotes.indexOf(userId)
              let upvotes = social.upvotes.indexOf(userId)    
              if (downvotes > -1)  social.downvotes.splice(downvotes, 1)
              if (upvotes > -1)  social.upvotes.splice(upvotes, 1)
              else social.upvotes.push(userId)
              return social.save()
            }
          })
          .then((social) => {
            res.status(200).json({ 
                message: 'success upvote', social
            })
          })
          .catch(next)
      }
    
    
      static downvote(req, res, next) {
        const userId = req.decode.id
        const id = req.params.id
    
        Social.findById(id)
          .then(social => {
            if (social) {
              let downvotes = social.downvotes.indexOf(userId)
              let upvotes = social.upvotes.indexOf(userId)

              if (upvotes > -1)  social.upvotes.splice(upvotes, 1)
              if (downvotes > -1) social.downvotes.splice(downvotes, 1)
              else social.downvotes.push(userId)
              return social.save()
            }
          })
          .then((social) => {
            res.status(200).json({ 
                message: 'success downvote', social
            })
          })
          .catch(next)
      }

}

module.exports = SocialController