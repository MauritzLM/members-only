const User = require("../models/user");

// sign up form GET
exports.getSignupForm = (req, res) => {
    res.render("signup_form", { title: "Sign up" })
}

// sign up form POST