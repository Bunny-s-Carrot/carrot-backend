const AuthController = require('./authController');
const router = require('express').Router();

const authController = new AuthController();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);

module.exports = router;