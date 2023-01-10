const pool = require('../../config/database');

class AuthService {

  signup = (data, callBack) => {
    pool.query(
      `insert into USER(email, password, name, location)
      values(?, ?, ?, ?)`,
      [
        data.email,
        data.password,
        data.name,
        data.locationId,
      ],
      (err, results, fields) => {
        if (err) {
          return callBack(err);
        }
  
        return callBack(null, results);
      }
    )
  }

  findUserByEmail = (email, callBack) => {
    pool.query(
      `select * from USER where email = ?`,
      [email],
      (err, results, fields) => {
        if (err) {
          return callBack(err);
        }

        return callBack(null, results[0]);
      }
    )
  }
}


module.exports = AuthService;
