var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/article', {
    useNewUrlParser: true
})

var articleSchema = new Schema({
    title: String,
    content: String,
    created_At: Date,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    featured_image: String
});



let Article = mongoose.model('Articles', articleSchema)



module.exports = Article