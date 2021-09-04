const router = require('express').Router();
const { getUserInfo, patchUserInfo } = require('../controllers/users');
const { validateProfileData } = require('../validation/users');

// GET /users/me
router.get('/me', getUserInfo);

// PATCH /users/me
router.patch('/me', validateProfileData, patchUserInfo);

module.exports = router;
