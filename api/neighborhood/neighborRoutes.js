const neighborController = require('./neighborController');
const router = require('express').Router();


router.get('/', neighborController.getPosts);

module.exports = router;