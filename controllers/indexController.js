const Message = require("../models/message");

// Display home page on get
exports.getHomePage = async function (req, res, next) {
    // GET all messages
    try {
        const results = await Message.find().populate("author");

        res.render("index", {
            title: "Homepage",
            messages: results
        });

    }
    catch (err) {
        return next(err);
    }
}
