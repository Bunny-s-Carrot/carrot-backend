require("dotenv").config();
const AuthService = require('./authService');
const jwt = require('jsonwebtoken')
const { hash: hashPassword, compare: comparePassword } = require('../../utils/auth/password');
const { generateToken, refreshToken } = require('../../utils/auth/token')


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
        return res.status(403).json({
          success: 0,
          message: "Invalid email or password"
        });
      }
      const result = comparePassword(body.password, results.password);
      if (result) {
        
        const accessToken = generateToken(results);
        const refToken = refreshToken(results);
        res.cookie('refresh_token', refToken, {
          secure: false,
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000
        })
        
        return res.status(200).json({
          success: 1,
          message: "Login Successfully",
          token: accessToken,
        })
      } else {
        return res.status(500).json({
          success: 0,
          message: "Invalid email or password"
        })
      }
    })
  }

  refreshToken = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.refresh_token) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.refresh_token;

    jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_KEY,
      (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' })
        this.authService.findUserByEmail(decoded.email, (err, results) => {
          if (err) return res.status(401).json({ message: 'Unauthorized'});

          const token = generateToken(decoded);
          res.json({
            token 
          });
        })
      
      }
    )
  }

  logout = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.refresh_token) return res.sendStatus(204);
    
    res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'none', secure: false })
    res.json({ message: 'Cookie Cleared' })
  }
}


module.exports = AuthController;
