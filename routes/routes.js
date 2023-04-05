const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");
const signupController = require("../controllers/signupController");
const loginController = require("../controllers/loginController");
const messageController = require("../controllers/messageController");

// Homepage
router.get("/", indexController.getHomePage);

// Sign up form
// GET
router.get("/signup", signupController.signupFormGet);

//POST
router.post("/signup", signupController.signupFormPost);

// Login form
//GET
router.get("/login", loginController.loginFormGet);

//POST
router.post("/login", loginController.loginFormPost);

// Logout
// GET
router.get("/logout", loginController.logoutGet);

// POST
router.post("/logout", loginController.logoutPost);

// join the club
//GET
router.get("/joinclub", signupController.joinclubGet);

//POST
router.post("/joinclub", signupController.joinclubPost);

// message form
//GET
router.get("/message", messageController.messageFormGet);

//POST
router.post("/message", messageController.messageFormPost);

module.exports = router;