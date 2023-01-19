const router = require('express').Router();
const authRoutes = require('../api/auth/authRoutes');
const userRoutes = require('../api/user/userRoutes');
const locationRoutes = require('../api/location/locationRoutes');
const neighborRoutes = require('../api/neighborhood/neighborRoutes');
const productRoutes = require('../api/product/productRoutes');
const createpostRoutes = require('../api/neighborhood/createpost/createpostRoutes')

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/location', locationRoutes);
router.use('/post',neighborRoutes);
router.use('/product', productRoutes);
router.use('/createpost', createpostRoutes)


module.exports = router;
  
 