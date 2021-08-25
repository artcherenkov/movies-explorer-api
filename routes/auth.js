const router = require("express").Router();
const { login, createUser, logout } = require("../controllers/auth");
const { validateAuth } = require("../validation/auth");

// POST /signin
router.post("/signin", validateAuth, login);

// POST /signup
router.post("/signup", validateAuth, createUser);

// POST /signout
router.post("/signout", logout);

module.exports = router;
