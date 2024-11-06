const express = require('express');
const router = express.Router();
const { loginUser,logoutUser,loginUserByJWT } = require('../controllers/authController_User');
router.post('/login', loginUser);
router.post('/login/jwt', loginUserByJWT);
router.post('/logout', logoutUser);
module.exports = router;