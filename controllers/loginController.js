const User = require("../models/user");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// GET login form
exports.loginFormGet = (req, res) => {
    res.render("login_form", { title: "Login" });
}

// POST
exports.loginFormPost = [
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureMessage: true
    }), (req, res) => {
        res.redirect("/");
    }
];


// logout
// GET
exports.logoutGet = (req, res) => {
    res.render("logout", { title: "Logout" });
}

//POSt
exports.logoutPost = function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    })
}
