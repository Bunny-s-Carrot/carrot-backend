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

const neighborController = {
  getPosts,
}

module.exports = neighborController

