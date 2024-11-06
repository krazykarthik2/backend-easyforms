const express = require('express');
const router = express.Router();
const { getAdmins,getAdminById ,createAdmin,updateAdmin,deleteAdmin} = require('../controllers/adminController');
const { loadToken, getUserFromToken, verifyAdminToken } = require('../middleware/authMiddleware');

router.get('/',getAdmins );
router.get('/:id', getAdminById);
router.post('/create',[loadToken,getUserFromToken,verifyAdminToken], createAdmin);
router.put('/edit/:id',[loadToken,getUserFromToken,verifyAdminToken], updateAdmin);
router.delete('/delete/:id',[loadToken,getUserFromToken,verifyAdminToken], deleteAdmin);

module.exports = router;

