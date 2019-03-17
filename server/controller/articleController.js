const Model = require('../models/article'),
    User = require('../models/user'),
    jwt = require('../helper/jwt'),
    images = require('../helper/images')
var multer = require('multer')

class Controller {


    static unggah(req, res) {


        let validasi = jwt.verify(req.headers.token)
        console.log(validasi);

        console.log('ini req.filenya', req.file)
        console.log("masuk sini foto", req.body)
        if (validasi) {
            User.findOne({
                    email: validasi.email
                })
                .then(function (user) {
                    let obj = {
                        title: req.body.title,
                        content: req.body.content,
                        created_At: new Date(),
                        featured_image: req.file.cloudStoragePublicUrl,
                        author: user._id

                    }
                    return Model.create(obj)
                })
                .then(function (data) {
                    res.status(200).json(data)
                })
                .catch(function (err) {
                    res.status(500).json(err)
                })
        }

        // Model.create(obj)
        //     .then(videodb => {
        //         console.log(videodb, 'masuk db')
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        // res.send({
        //     status: 200,
        //     message: 'Your file is successfully uploaded',
        //     link: req.file.cloudStoragePublicUrl
        // })
        // console.log("setelah res send upload")
    }
    static addArticle(req, res) {

    }

    static getOne(req, res) {

        Model.find({
                _id: req.body.id
            })
            .then(function (data) {
                res.status(200).json(data)
            })
            .catch(function (err) {
                res.status(500).json({
                    message: 'internal servel error'
                })
            })

    }
    static one(req, res) {
        // console.log(req.headers.token);
        var validasi = jwt.verify(req.headers.token)
        // console.log(validasi);
        if (validasi) {
            User.find({
                    email: validasi.email
                })
                .then(function (data) {
                    // res.send(data)
                    return Model.find({
                            author: data[0]._id
                        })
                        .populate('author')
                })
                .then(function (data) {
                    res.send(data)
                })
                .catch(function (err) {
                    res.send(err)
                })
        }
    }


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
        var validasi = jwt.verify(req.headers.token)
        req.body.created_At = Date(req.body.created_At)
        console.log(req.params.id);

        if (validasi) {

            Model.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    $set: req.body
                })
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'internal servel error'
                    })
                })

        }

    }
    static remove(req, res) {
        console.log(req.params);
        console.log(req.headers.token);
        var validasi = jwt.verify(req.headers.token)

        User.find({
                email: validasi.email
            })
            .then(function (data) {
                // res.send(data)
                if (data) {
                    console.log(data);
                    return Model.findByIdAndDelete(req.params.id)

                } else {
                    res.status(404).json({
                        message: 'not fond'
                    })
                }
            })
            .then(function (data) {
                res.status(200).json(data)
            })
            .catch(function (err) {
                res.send(err)
            })
        // Model.findByIdAndDelete(req.params.id, function (err, data) {
        //     if (data) {
        //         res.status(200).json(data)
        //     } else {
        //         res.status(500).json({
        //             messege: 'not fond'
        //         })
        //     }
        // })
    }



}

module.exports = Controller