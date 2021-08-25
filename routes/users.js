const router = require("express").Router();
const { getUserInfo, patchUserInfo } = require("../controllers/movies");

// GET /users/me
router.get("/me", getUserInfo);

// PATCH /users/me
router.patch("/me", patchUserInfo);

module.exports = router;
