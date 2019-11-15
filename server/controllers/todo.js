const Todo = require('../models/Todo');

class TodoController {
    static create(req, res, next) {
        req.body.UserId = req.decoded.id;
        
        Todo
            .create(req.body)
            .then( data => {
                res.status(201).json(data);
            })
            .catch( err => {
                res.status(500).json(err);
            })
    }

    static showAll(req, res, next) {
        Todo
            .find()
            .then( datas => {
                let result = [];
                for (let todo in datas) {
                    if (datas[todo].UserId == req.decoded.id) {
                        result.push(datas[todo]);
                    }
                }
                res.status(200).json(result);
            })
            .catch( err => {
                res.status(500).json(err);
            })
    }

    static showOne(req, res, next) {
        Todo
            .findById(req.params.id)
            .then( data => {
                res.status(200).json(data)
            })
            .catch( err => {
                res.status(500).json(err)
            })
    }

    static updateOne(req, res, next) {
        Todo
            .findOneAndUpdate({_id: req.params.id}, req.body)
            .then(data => {
                res.status(201).json(data)
            })
            .catch( err => {
                res.status(500).json(data)
            })
    }

    static updateStatus(req, res, next) {
        let updateTo = (req.body.status == 'false') ? true : false;
        Todo
            .findOneAndUpdate({_id: req.params.id}, {status: updateTo})
            .then( data => {
                res.status(201).json(data)  
            })
            .catch( err => {
                res.status(500).json(err)
            })
    }

    static deleteOne(req, res, next) {
        Todo
            .findByIdAndRemove({_id: req.params.id})
            .then( data => {
                console.log(data)
                res.status(201).json(data)  
            })
            .catch( err => {
                res.status(500).json(err)
            })
    }
}

module.exports = TodoController;