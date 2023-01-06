const router = require('express').Router();
const authRoutes = require('../api/auth/authRoutes');
const userRoutes = require('../api/user/userRoutes');
const locationRoutes = require('../api/location/locationRoutes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/location', locationRoutes);


module.exports = router;
  
