const router = require('express').Router();
const authRoutes = require('../api/auth/authRoutes');
const userRoutes = require('../api/user/userRoutes');


router.use('/auth', authRoutes);
router.use('/user', userRoutes);


module.exports = router;
  
