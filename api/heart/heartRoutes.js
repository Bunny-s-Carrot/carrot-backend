const router = require('express').Router();
const heartController = require('./heartController');

router.post('/', heartController.updateHeart);
router.get('/:type/:id', heartController.getHeart)

module.exports = router;