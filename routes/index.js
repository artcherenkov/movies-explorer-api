const router = require("express").Router();

const authRouter = require("./auth");
const moviesRouter = require("./movies");
const usersRouter = require("./users");

router.use("/users", usersRouter);
router.use("/movies", moviesRouter);
router.use("/", authRouter);

module.exports = router;
