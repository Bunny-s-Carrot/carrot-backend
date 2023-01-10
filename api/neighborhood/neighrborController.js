const NeighborService = require('./neighborService');

class NeighborController {
    neighborService = new NeighborService();

  getPosts = (req, res) => {
		this.neighborService.getPosts((err, results) => {
			if (err) {
				throw Error(err);
			}
			return res.status(200).json({
				success: 1,
				payload: results,
			})
		})
	}

}

module.exports = NeighborController;