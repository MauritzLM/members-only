const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

// message form GET
exports.messageFormGet = (req, res) => {
    res.render("message_form", { title: "New message" });
};

// message form POST
exports.messageFormPost = [
    body("message", "please include a message")
        .isLength({ min: 2 })
        .trim()
        .escape(),
    async function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("message_form", {
                title: "New message",
                errors: errors.array()
            });
            return;
        }

        try {
            const message = new Message({
                author: req.body.userid,
                timestamp: Date.now(),
                content: req.body.message
            });

            await message.save();
            res.redirect("/");
        }
        catch (err) {
            return next(err);
        }
    }
];