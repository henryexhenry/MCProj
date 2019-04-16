var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    //_id: Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
        default: false
    },
    avater:{
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1YB9tCEv5TDTY0ffiKHBtq0SVxveHmA4dPpoxU2R9gQVPk5uImg'
    },
    description:{
        type: String,
        default: ''
    },
    friends:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    posts:[{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

User.plugin(passportLocalMongoose);


// create model
var Users = mongoose.model('User', User);

module.exports = Users;
