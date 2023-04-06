const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");
const signupController = require("../controllers/signupController");
const loginController = require("../controllers/loginController");
const messageController = require("../controllers/messageController");

// HOMEPAGE
router.get("/", indexController.getHomePage);

// DELETE message
router.post("/", indexController.messageDeletePost);

// SIGN UP form
// GET
router.get("/signup", signupController.signupFormGet);

//POST
router.post("/signup", signupController.signupFormPost);

// LOGIN forM
//GET
router.get("/login", loginController.loginFormGet);

//POST
router.post("/login", loginController.loginFormPost);

// LOGOUT
// GET
router.get("/logout", loginController.logoutGet);

// POST
router.post("/logout", loginController.logoutPost);

// JOIN THE CLUB
//GET
router.get("/joinclub", signupController.joinclubGet);

//POST
router.post("/joinclub", signupController.joinclubPost);

// MESSAGE form
//GET
router.get("/message", messageController.messageFormGet);

//POST
router.post("/message", messageController.messageFormPost);

// ADMIN page
//GET
router.get("/admin", signupController.adminGet);

//POST
router.post("/admin", signupController.adminPost);



module.exports = router;