const express = require('express');
const router = express.Router();
const { adminHelp,
    userHelp,
    notLoggedInHelp} = require('../controllers/helpController');
const { loadToken, getUserFromToken, verifyUserToken, verifyAdminToken } = require('../middleware/authMiddleware');
router.get('/admin',[loadToken, getUserFromToken, verifyAdminToken],adminHelp);
router.get('/user',[loadToken, getUserFromToken, verifyUserToken], userHelp);
router.get('/not-logged-in',notLoggedInHelp)
module.exports = router;

