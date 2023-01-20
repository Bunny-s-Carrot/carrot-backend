const router = require('express').Router();
const authRoutes = require('../api/auth/authRoutes');
const userRoutes = require('../api/user/userRoutes');
const locationRoutes = require('../api/location/locationRoutes');
const postRoutes = require('../api/post/postRoutes');
const productRoutes = require('../api/product/productRoutes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/location', locationRoutes);
router.use('/post', postRoutes);
router.use('/product', productRoutes);


module.exports = router;