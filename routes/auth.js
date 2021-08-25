const router = require("express").Router();
const { login, createUser, logout } = require("../controllers/auth");
const { validateSignup, validateSignin } = require("../validation/auth");

// POST /signin
router.post("/signin", validateSignin, login);

// POST /signup
router.post("/signup", validateSignup, createUser);

// POST /signout
router.post("/signout", logout);

module.exports = router;
