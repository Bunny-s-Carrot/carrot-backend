const UserService = require('./userService');

class UserController {
  userService = new UserService();

  getUsers = (req, res) => {
    this.userService.getUsers((err, results) => {
      if (err) {
        throw Error(err);
      }
      return res.json({
        success: 1,
        payload: results,
      })
    })
  }

  getUserById = (req, res) => {
    const user_id = req.params.user_id;
    this.userService.getUserById(user_id, (err, results) => {
      if (err) {
        throw Error(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        })
      }

      return res.json({
        success: 1,
        payload: results,
      })
    })
  }

  updateUser = (req, res) => {
    const body = req.body;
    const id = parseInt(req.params.user_id);
    if (body.password) { body.password = hash(body.password); }
    this.userService.updateUser({ body, id } , (err, results) => {
      if (err) {
        throw Error(err);
      }
      return res.json({
        success: 1,
        message: "Updated Successfully",
      })
    })
  }

  withdraw = (req, res) => {
    const id = req.params.user_id;
    this.userService.withdraw(id, (err, results) => {
      if (err) {
        throw Error(err);
      }
      
      return res.json({
        success: 1,
        message: "User Deleted Successfully"
      });
    });
  }
}


module.exports = UserController;
