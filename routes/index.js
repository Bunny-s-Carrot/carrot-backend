const router = require('express').Router();
const authRoutes = require('../api/auth/authRoutes');
const userRoutes = require('../api/user/userRoutes');
const locationRoutes = require('../api/location/locationRoutes');
const postRoutes = require('../api/post/postRoutes');
const productRoutes = require('../api/product/productRoutes');
const heartRoutes = require('../api/heart/heartRoutes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/location', locationRoutes);
router.use('/post', postRoutes);
router.use('/product', productRoutes);
router.use('/heart', heartRoutes);


module.exports = router;