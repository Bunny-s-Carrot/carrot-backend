const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const accessToken = jwt.sign(
    {
      userId: payload.user_id,
      email: payload.email,
      name: payload.name,
      location: payload.location,
      mannerTemp: payload.manner_temp,
      createdAt: payload.created_at,
      updatedAt: payload.updated_at,
    }, 
    process.env.JWT_SECRET_KEY, 
    {
    expiresIn: '15m'
    }
  );

  return accessToken;
}

const refreshToken = (payload) => {
  const refreshToken = jwt.sign(
    {
      userId: payload.user_id,
      email: payload.email,
      name: payload.name,
      location: payload.location,
      mannerTemp: payload.manner_temp,
      createdAt: payload.created_at,
      updatedAt: payload.updated_at,
    }, 
    process.env.JWT_SECRET_KEY, 
    {
    expiresIn: '30d'
    }
  );

  return refreshToken;
}



module.exports = { generateToken, refreshToken }