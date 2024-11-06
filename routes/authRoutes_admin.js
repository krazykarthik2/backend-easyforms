const express = require('express');
const  router = express.Router();
const { loginAdmin ,logoutAdmin,loginAdminByJWT} = require('../controllers/authController_Admin');

router.post('/login', loginAdmin);
router.post('/login/jwt', loginAdminByJWT);
router.post('/logout', logoutAdmin);
module.exports = router;