require("dotenv").config();
const authService = require('./authService');
const jwt = require('jsonwebtoken')
const { hash: hashPassword, compare: comparePassword } = require('../../utils/auth/password');
const { generateToken, refreshToken: generateRefToken } = require('../../utils/auth/token');
const userService = require("../user/userService");
const locationService = require("../location/locationService");


const signup = async (req, res) => {
  const body = req.body
  
  const user = await authService.findUserByEmail(body.email);

  if (user) {
    return res.json({
      success: 0,
      message: "Duplicate Email",
    })
  }
  body.password = hashPassword(body.password);
  await authService.signup(body);

  const result = await authService.findUserByEmail(body.email);
  const accessToken = generateToken(result);
  const refToken = generateRefToken(result);

  res.cookie('refresh_token', refToken, {
    secure: false,
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000
  })
  
  return res.status(200).json({
    success: 1,
    message: "Signup Successful",
    token: accessToken
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
  const locationData = await userService.getLocationById(result.user_id);
  const locationName = await locationService.getLocationNameById(locationData.location);
  const locationName2 = locationData.location2 && await locationService.getLocationNameById(locationData.location2);
  
  locationData['location_name'] = locationName?.lowest_sect_name
  locationData['location_name2'] = locationName2?.lowest_sect_name
  
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
      locationData,
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



