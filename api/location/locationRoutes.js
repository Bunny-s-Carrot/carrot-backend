const locationController = require('./locationController');
const router = require('express').Router();


router.get('/list', locationController.getLocations);
router.get('/:location_id/coords', locationController.getCoordsById);
router.get('/:location_id/adm_cd', locationController.getHcodeById);

module.exports = router;