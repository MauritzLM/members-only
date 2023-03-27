const mongoose = require('mongoose');

const Schema = mongoose.Schema();

const MessageSchema = new Schema({
    title: { type: String, required: true },
    timestamp: { type: Date, default: Date.now, required: true },
    content: { type: String, required: true }
});


module.exports = mongoose.models('Message', MessageSchema);