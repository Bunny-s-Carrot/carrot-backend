const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  console.log('generateToken', payload);
  const accessToken = jwt.sign(
    {
      user_id: payload.user_id,
      email: payload.email,
      name: payload.name,
      location: payload.location,
      manner_temp: payload.manner_temp,
      created_at: payload.created_at,
      updated_at: payload.updated_at,
    }, 
    process.env.JWT_SECRET_KEY, 
    {
    expiresIn: '10s'
    }
  );

  return accessToken;
}

const refreshToken = (payload) => {

  const refreshToken = jwt.sign(
    {
      user_id: payload.user_id,
      email: payload.email,
      name: payload.name,
      location: payload.location,
      manner_temp: payload.manner_temp,
      created_at: payload.created_at,
      updated_at: payload.updated_at,
    }, 
    process.env.JWT_SECRET_KEY, 
    {
    expiresIn: '30d'
    }
  );

  return refreshToken;
}



module.exports = { generateToken, refreshToken }