const AuthController = require('./authController');
const router = require('express').Router();

const authController = new AuthController();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;