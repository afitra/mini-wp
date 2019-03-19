var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongodb = require('mongodb')
const hash = require('../helper/hash');
// mongoose.connect('mongodb://localhost:27017')

var userSchema = new Schema({
    username: String,
    email: {
        type: String,
        validate: [{
            validator: function (value) {
                return User.findOne({
                        email: value,
                        _id: {
                            $ne: this._id
                        }
                    })
                    .then(function (data) {
                        if (data) {
                            throw new Error(`Email already exist`)
                        }

                    })
                    .catch(function (err) {
                        throw new Error(err)
                    })
            }
        }, {
            validator: function (value) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(value).toLowerCase());
            },
            message: 'Email format wrong'
        }]
    },
    password: String

});

userSchema.pre('save', function (next) {
    if (this.password) {
        this.password = hash(this.password)
    }
    next()
})








let User = mongoose.model('Users', userSchema)


module.exports = User