const express = require('express');
const router = express.Router();
const { getAllUsers,getUserById,createUser,updateUser,deleteUser } = require('../controllers/userController');
const { ifAdminOrSameUser } = require('../middleware/mergedMiddleware');
const { loadToken, getUserFromToken, verifyAdminToken } = require('../middleware/authMiddleware');
router.get('/', [loadToken,getUserFromToken,verifyAdminToken],getAllUsers);
router.get('/:id', getUserById);
router.post('/create', createUser);
router.put('/edit/:id',[ ifAdminOrSameUser], updateUser);
router.delete('/delete/:id',[ ifAdminOrSameUser], deleteUser);

module.exports = router;