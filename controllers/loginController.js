const User = require("../models/user");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// GET login form
exports.loginFormGet = (req, res) => {
    res.render("login_form", { title: "Login" });
}

// POST
exports.loginFormPost = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
}