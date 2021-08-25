const router = require("express").Router();

const { login, createUser, logout } = require("../controllers/auth");

// GET /signin
router.post("/signin", login);

// POST /signup
router.post("/signup", createUser);

// DELETE /signout
router.post("/signout", logout);

module.exports = router;
