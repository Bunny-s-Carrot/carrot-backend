const router = require('express').Router();
const authRoutes = require('../api/auth/authRoutes');
const userRoutes = require('../api/user/userRoutes');
const locationRoutes = require('../api/location/locationRoutes');
const neighborRoutes = require('../api/neighborhood/neighborRoutes');


router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/location', locationRoutes);
<<<<<<< Updated upstream
router.use('/post',neighborRoutes);
router.use('/product', productRoutes)
=======
router.use('/neighbor',neighborRoutes);
>>>>>>> Stashed changes


module.exports = router;
  
