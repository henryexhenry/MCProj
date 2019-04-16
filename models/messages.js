const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const messageSchema = new Schema({
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

var Messages = mongoose.model('Message', messageSchema);

module.exports = Messages;