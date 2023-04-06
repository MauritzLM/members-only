const User = require("../models/user");
const bcrypt = require("bcryptjs")
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
    body("password", "password must at least be 8 characters")
        .isLength({ min: 8 })
        .trim()
        .escape(),

    async function (req, res, next) {
        // errors
        const errors = validationResult(req);

        // hash password with bcrypt
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            // if error
            if (err) {
                return next(err);
            }
            // create new user
            try {
                const user = new User({
                    first_name: req.body.firstname,
                    last_name: req.body.lastname,
                    username: req.body.username,
                    password: hashedPassword,
                    membership_status: false
                });

                if (!errors.isEmpty()) {
                    res.render("signup_form", {
                        title: "Sign up",
                        user,
                        errors: errors.array()
                    });
                    // return if there are validation errors
                    return;
                }
                const result = await user.save();
                res.redirect('/');
            }
            catch (err) {
                return next(err);
            }
        });
    }
];

// Become a member GET
exports.joinclubGet = (req, res) => {
    res.render("join_club", { title: "Join the members club" });
};

// Become a member POST
exports.joinclubPost = [
    // validate & sanitize
    body("answer")
        .custom((value => {
            if (value !== 'Augusta National') {
                throw new Error('Wrong Answer!');
            }
            return true;
        }))
        .trim()
        .escape(),
    async function (req, res, next) {
        // Errors 
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("join_club", {
                title: "Join the members club",
                errors: errors.array()
            })
            return;
        }
        // find User and change membership status
        try {
            await User.findByIdAndUpdate(req.body.userid, { membership_status: true }, {});
            res.render("index");
        }
        catch (err) {
            return next(err);
        }
    }
];

//admin page GET
exports.adminGet = (req, res) => {
    res.render("admin", { title: "Admin" });
}

//admin page POST
exports.adminPost = [
    // validate and sanitize
    body("admin-code")
        .custom((value => {
            if (value !== '7524') {
                throw new Error("Incorrect code")
            }
            return true
        }))
        .trim()
        .escape(),
    async function (req, res, next) {
        //Errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("admin", {
                title: "Admin",
                errors: errors.array()
            });
            return;
        }
        try {
            await User.findByIdAndUpdate(req.body.userid, { admin: true }, {});
            res.redirect("/admin");
        }
        catch (err) {
            return next(err);
        }
    }
];