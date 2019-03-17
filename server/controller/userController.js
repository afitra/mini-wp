const Model = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('../helper/jwt')
class Controller {
    static login(req, res) {
        Model.findOne({
                email: req.body.email
            })
            .then(function (user) {

                if (!user) {
                    res.status(400).json({
                        message: 'Email/Password salah'
                    })
                } else {
                    let validasi = bcrypt.compareSync(req.body.password, user.password);
                    if (validasi == false) {
                        res.status(400).json({
                            message: 'Wrong Email/Password'
                        })
                    } else {
                        let token = jwt.sign({
                            email: user.email
                        })
                        // console.log(token);
                        res.status(200).json({
                            token
                        })
                    }
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    static create(req, res) {
        if (req.body.username !== undefined && req.body.email !== undefined && req.body.password !== undefined) {
            Model.create(req.body)
                .then(function (data) {
                    res.status(200).json(data)
                })
                .catch(function (err) {
                    res.status(500).json({
                        messege: err.message
                    })
                })
        } else {
            throw Error
        }

    }
    static all(req, res) {

        Model.find({})
            .then(function (data) {
                res.status(200).json(data)
            })
            .catch(function (err) {
                res.send(err)
            })
    }
    static edit(req, res) {

        Model.findOneAndUpdate(req.params.id, req.body)

            .then(function (data) {
                res.status(200).json(data)
            })
            .catch(function (err) {
                res.status(500).json({
                    messege: err.message
                })
            })


    }
    static remove(req, res) {
        Model.findByIdAndDelete(req.params.id)
            .then(function (data) {
                res.status(200).json(data)
            })
            .catch(function (err) {
                res.send(err)
            })
    }


}

module.exports = Controller