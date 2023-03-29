const User = require("../models/user");
const { body, validationResult } = require('express-validator');

// sign up form GET
exports.signupFormGet = (req, res) => {
    res.render("signup_form", { title: "Sign up" })
}

// sign up form POST
exports.signupFormPost = [
    // validate and sanitize
    body("firstname", "please enter your first name")
        .isLength({ min: 1 })
        .trim()
        .escape(),
    body("lastname", "please enter your last name")
        .isLength({ min: 1 })
        .trim()
        .escape(),
    body("username", "please enter your email")
        .isEmail()
        .normalizeEmail()
        .escape(),
    body("password", "please enter a password")
        .isLength({ min: 8 })
        .trim()
        .escape(),

    async function (req, res, next) {
        // errors
        const errors = validationResult(req);

        const user = new User({
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            membership_status: false
        });

        if (!errors.isEmpty()) {
            res.render("signup_form", {
                title: "Sign up",
                user,
                errors: errors.array()
            });
            // return if there are errors
            return;
        }
        // create new user
        try {
            const result = await user.save();
            res.redirect('/');
        }
        catch (err) {
            return next(err);
        }
    }
];