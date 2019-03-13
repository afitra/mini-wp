const Model = require('../models/article')

class Controller {

    static add(req, res) {
        req.body.created_At = Date(req.body.created_At)
        Model.create(req.body, function (err, data) {
            if (data) {


                res.send(data)
            } else {
                res.status(500).json(err.message)
            }
        })


    }


    static all(req, res) {

        Model.find({}, function (err, data) {
            if (data) {
                res.send(data)
            } else {
                res.send('not')
            }
        })


    }

    static edit(req, res) {
        req.body.created_At = Date(req.body.created_At)
        Model.findOneAndUpdate(req.params.id, req.body, function (err, data) {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(500).json({
                    messege: 'not fond'
                })
            }

        })

    }
    static remove(req, res) {
        console.log(req.params);

        Model.findByIdAndDelete(req.params.id, function (err, data) {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(500).json({
                    messege: 'not fond'
                })
            }
        })
    }



}

module.exports = Controller