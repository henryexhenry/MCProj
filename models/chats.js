const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const chatSchema = new Schema({
    content: {
        type: String
    },
    image: {
        type: String
    },
},{
    timestamps: true,
    usePushEach: true
});

var Chats = mongoose.model('Chat', chatSchema);

module.exports = Chats;