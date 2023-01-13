const pool = require('../../config/database');

class NeighborService {
    
<<<<<<< Updated upstream
const getPosts = async () => {
  try {
	  const posts = await pool.query(
		`select NEIGHBORHOOD.*, lowest_sect_name from NEIGHBORHOOD inner join USER on writer_id = user_id inner join LOCATION on location = location_id;`,
	  )
=======
  getPosts = callBack => {
		pool.query(
			`select * from NEIGHBORHOOD;`,
			(err, results, fields) => {
				if (err) {
					console.log('error');
				}
>>>>>>> Stashed changes

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