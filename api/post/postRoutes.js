const postController = require('./postController');
const router = require('express').Router();


router.get('/', postController.getPosts);
router.get('/:post_id', postController.getPostDetail);
router.post('/', postController.createPost);


module.exports = router;