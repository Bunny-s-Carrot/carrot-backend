const postController = require("./postController");
const router = require("express").Router();

router.get("/", postController.getPosts);
router.get("/:post_id", postController.getPostDetail);
router.get("/category/:classif_id", postController.getPostsByCategory);
router.get('/image/:post_id', postController.getImageList);
router.post("/", postController.createPost);
router.post("/:post_id/delete", postController.deletePost);
router.post("/:post_id/comment", postController.createComment);
router.post("/:post_id/comment/:comment_id", postController.createRecomment);
router.post('/image/upload', postController.uploadImages);
router.post('/:post_id/heart',postController.updateHeart);
router.post('/:post_id/empa',postController.updateEmpa);

module.exports = router;
