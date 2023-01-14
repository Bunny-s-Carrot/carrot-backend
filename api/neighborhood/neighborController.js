const neighborService = require('./neighborService');

const getPosts = async (req, res) => {
	const results = await neighborService.getPosts();

  if (results.length === 0) {
    return res.status(404).json({
      success: 0,
      message: 'Posts Not Found'
    })
  }
	return res.status(200).json({
		success: 1,
		payload: results,
	})
}

const getPostDetail = async (req, res) => {
  const postId = req.params.post_id;
  const postInfo = await neighborService.getPostById(postId);

  const result = {post: postInfo};

  if (postInfo === undefined) {
    return res.status(404).json({
      success: 0,
      message: "Post Not Found"
    })
  }

  return res.status(200).json({
    success: 1,
    payload: result
  })
}


const neighborController = {
  getPosts,
  getPostDetail
}

module.exports = neighborController

