var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/article', {
    useNewUrlParser: true
})

var articleSchema = new Schema({
    title: String,
    article: String,
    created_At: Date

});



let Article = mongoose.model('Articles', articleSchema)



module.exports = Article