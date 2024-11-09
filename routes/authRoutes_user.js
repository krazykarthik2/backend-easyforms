const express = require('express');
const router = express.Router();
const { loadToken } = require('../middleware/authMiddleware');
const { loginUser,logoutUser,loginUserByJWT } = require('../controllers/authController_User');
router.post('/login', loginUser);
router.post('/login/jwt', [loadToken],loginUserByJWT);
router.post('/logout',  logoutUser);
module.exports = router;
