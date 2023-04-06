const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    timestamp: { type: Date, default: Date.now, required: true },
    content: { type: String, required: true },
});

// virtual for date format
MessageSchema.virtual('dateFormatted').get(function () {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_MED);
});


module.exports = mongoose.model("Message", MessageSchema);