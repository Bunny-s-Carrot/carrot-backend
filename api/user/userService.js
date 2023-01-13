const pool = require('../../config/database');

class UserService {
  
  getUsers = callBack => {
    pool.query(
      `select user_id, email, name, location, manner_temp from USER`,
      [],
      (err, results, fields) => {
        if (err) {
          return callBack(err);
        }
  
        return  callBack(null, results);
      }
    )
  }

  getUserById = (id, callBack) => {
    pool.query(
      `select user_id, email, name, location, manner_temp from USER where user_id = ?`,
      [id],
      (err, results, fields) => {
        if (err) {
          return callBack(err);
        }
  
        return callBack(null, results[0]);
      }
    )
  }
  
  updateUser = (data, callBack) => {
    // console.log('hihihihi', data);
    pool.query(
      `update USER set password=?, name=?, location=?, manner_temp=? where user_id = ?`,
      [
        data.body.password,
        data.body.name,
        data.body.location,
        data.body.manner_temp,
        data.id,
      ],
      (err, results, fields) => {
        if (err) {
          return callBack(err);
        }
  
        return callBack(null, results[0]);
      }
    )
  }
  
  withdraw = (id, callBack) => {
    pool.query(
      `delete from USER where user_id = ${id}`,
      (err, results, fields) => {
        if (err) {
          return callBack(err);
        }
  
        return callBack(null, results);
      }
    )
  }
}


module.exports = UserService;
