const { verifyJWT } = require('../../middlewares/verifyJWT');
const UserController = require('./userController');
const router = require('express').Router();

const userController = new UserController();

router.get('/', verifyJWT, userController.getUsers);
router.get('/:user_id', verifyJWT, userController.getUserById);
router.patch('/:user_id', verifyJWT, userController.updateUser);
router.delete('/:user_id/withdraw', verifyJWT, userController.withdraw);

module.exports = router;