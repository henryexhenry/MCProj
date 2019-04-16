const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    image: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyw_GAr9qXmhunuJOpjl1EwG31QldeCat7nj6qIzYZQLQOkFCn'
    },
    tags: [{
        type: String,
    }]
},{
    timestamps: true,
    usePushEach: true
});

var Posts = mongoose.model('Post', postSchema);

module.exports = Posts;