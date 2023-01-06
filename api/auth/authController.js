require("dotenv").config();
const jwt = require('jsonwebtoken');
const AuthService = require('./authService');
const { hash: hashPassword, compare: comparePassword } = require('../../utils/password');

class AuthController {
  authService = new AuthService();

  signup = (req, res) => {
    const body = req.body;
    body.password = hashPassword(body.password);
    this.authService.signup(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database Connection Error"
        });
      }
  
      return res.status(200).json({
        success: 1,
        payload: results,
      })
    })    
  }

  login = (req, res) => {
    const body = req.body;
    this.authService.findUserByEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Invalid email or password"
        });
      }
      const result = comparePassword(body.password, results.password);
      if (result) {
        results.password = undefined;
        const token = jwt.sign({ result: results }, process.env.JWT_SECRET_KEY, {
          expiresIn: '1d'
        });
        return res.json({
          success: 1,
          message: "Login Successfully",
          token,
        })
      } else {
        return res.json({
          success: 0,
          message: "Invalid email or password"
        })
      }
    })
  }
}


module.exports = AuthController;
