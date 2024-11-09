const express = require('express');
const  router = express.Router();
const { loadToken } = require('../middleware/authMiddleware');
const { loginAdmin ,logoutAdmin,loginAdminByJWT} = require('../controllers/authController_Admin');

router.post('/login', loginAdmin);
router.post('/login/jwt', [loadToken], loginAdminByJWT);
router.post('/logout', logoutAdmin);
module.exports = router;