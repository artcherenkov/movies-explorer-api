const router = require("express").Router();
const auth = require("../middlewares/auth");

const authRouter = require("./auth");
const moviesRouter = require("./movies");
const usersRouter = require("./users");

router.use("/users", auth, usersRouter);
router.use("/movies", auth, moviesRouter);
router.use("/", authRouter);

module.exports = router;
