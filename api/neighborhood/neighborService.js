const pool = require('../../config/database');

class NeighborService {
    
  getPosts = callBack => {
		pool.query(
			`select * from NEIGHBORHOOD;`,
			(err, results, fields) => {
				if (err) {
					console.log('error');
				}

				return callBack(null, results);
			}
		)
  }

	// getUserbyWriterId = callBack => {
	// 	pool.query(
	// 		``
	// 	)
	// }
}

module.exports = NeighborService;