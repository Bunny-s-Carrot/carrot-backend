const pool = require('../../config/database');
    
const getPosts = async () => {
  try {
	  const posts = await pool.query(
		`select * from NEIGHBORHOOD;`,
	  )

    return posts[0];
  } catch(e) {
    throw Error(e);
  }
}

// const getUserbyWriterId = callBack => {
// 	pool.query(
// 		``
// 	)
// }

const neighborService = {
  getPosts,
}

module.exports = neighborService