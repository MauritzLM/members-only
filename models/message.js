const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    timestamp: { type: Date, default: Date.now, required: true },
    content: { type: String, required: true },
});


module.exports = mongoose.model('Message', MessageSchema);