
const UserController = require('./userController');
const router = require('express').Router();
const { verifyToken } = require('../../middlewares/auth/token')
const userController = new UserController();

router.use(verifyToken);

router.get('/', userController.getUsers);
router.get('/:user_id', userController.getUserById);
router.patch('/:user_id', userController.updateUser);
router.delete('/:user_id/withdraw', userController.withdraw);

module.exports = router;