require("dotenv").config();
const authService = require('./authService');
const jwt = require('jsonwebtoken')
const { hash: hashPassword, compare: comparePassword } = require('../../utils/auth/password');
const { generateToken, refreshToken: generateRefToken } = require('../../utils/auth/token')


const signup = (req, res) => {
  const body = req.body;
  body.password = hashPassword(body.password);
  authService.signup(body, (err, results) => {
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

const login = async (req, res) => {
  const body = req.body;
  const result = await authService.findUserByEmail(body.email);

  if (result === undefined) {
    return res.status(403).json({
      success: 0,
      message: "Invalid email or password"
    });
  }
  
  const passwordCorrect = comparePassword(body.password, result.password);
  if (passwordCorrect) {
        
    const accessToken = generateToken(result);
    const refToken = generateRefToken(result);

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
}

const refreshToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refresh_token) return res.status(401).json({ message: 'Unauthorized' })

  const refreshToken = cookies.refresh_token;

  jwt.verify(
    refreshToken,
    process.env.JWT_SECRET_KEY,
    async (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Unauthorized' });
    
      const token = generateToken(decoded);
      res.json({
        token 
      });
    }
  )
}
  

const logout = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refresh_token) return res.sendStatus(204);
    
  res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'none', secure: false })
  res.json({ message: 'Cookie Cleared' })
}

const authController = {
  signup,
  login,
  refreshToken,
  logout,
}

module.exports = authController;



