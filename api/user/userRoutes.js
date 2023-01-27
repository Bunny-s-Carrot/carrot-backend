const userController = require('./userController');
const router = require('express').Router();
const { verifyToken } = require('../../middlewares/auth/token');

// router.use(verifyToken);

router.get('/', userController.getUsers);
router.get('/:user_id', userController.getUserById);
router.get('/:user_id/location', userController.getLocationById);
router.patch('/:user_id', userController.updateUser);
router.patch('/:user_id/location1', userController.updateLocation);
router.patch('/:user_id/location2', userController.updateLocation);
router.delete('/:user_id/location1', userController.deleteLocation);
router.delete('/:user_id/location2', userController.deleteLocation);
router.get('/:user_id/area1', userController.getArea);
router.get('/:user_id/area2', userController.getArea);
router.patch('/:user_id/area1/:area', userController.updateArea);
router.patch('/:user_id/area2/:area', userController.updateArea);
router.get('/:user_id/active-location', userController.getActiveLocation);
router.post('/:user_id/active-location/:active_location', userController.updateActiveLocation);
router.delete('/:user_id/withdraw', userController.withdraw);

module.exports = router;