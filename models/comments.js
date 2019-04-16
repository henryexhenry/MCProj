const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    content: {
        type: String,
        required: true
    },
    comments:[{
        // comments of a comment
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
},{
    timestamps: true,
    usePushEach: true
});

var Comments = mongoose.model('Comment', commentSchema);

module.exports = Comments;