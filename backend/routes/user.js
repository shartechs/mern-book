const express = require("express");
const { loginUser, signupUser } = require("../controllers/userController");

const router = express.Router();

// Login route
router.post("/login", loginUser);

// Sign Up route
router.post("/signup", signupUser);

module.exports = router;
