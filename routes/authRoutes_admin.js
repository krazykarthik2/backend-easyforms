const express = require('express');
const  router = express.Router();
const { loadToken, getUserFromToken, verifyAdminToken } = require('../middleware/authMiddleware');
const { loginAdmin ,logoutAdmin,loginAdminByJWT} = require('../controllers/authController_Admin');

router.post('/login', loginAdmin);
router.post('/login/jwt', [loadToken], loginAdminByJWT);
router.post('/logout',[loadToken,getUserFromToken], logoutAdmin);
module.exports = router;