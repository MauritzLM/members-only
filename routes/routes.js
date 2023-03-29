const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");
const signupController = require("../controllers/signupController");

// Homepage
router.get("/", indexController.getHomePage);

// Sign up form
// GET
router.get("/signup", signupController.signupFormGet);

//POST
router.post("/signup", signupController.signupFormPost);

// Login form


// join the club


// message form


module.exports = router;