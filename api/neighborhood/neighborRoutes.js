const neighborController = require('./neighborController');
const router = require('express').Router();


router.get('/', neighborController.getPosts);
router.get('/:post_id', neighborController.getPostDetail);

module.exports = router;