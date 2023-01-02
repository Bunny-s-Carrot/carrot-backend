const express = require('express');
const { signup, login } = require('../controllers/authController');
const userRouter = express.Router();

userRouter.post('/auth/signup', signup);
userRouter.post('/auth/login', login);

module.exports = userRouter;