const userModel = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = "NOTESAPI"

const signup = async (req, res) => {
  // Existing User Check
  // Hashed Password
  // User Creation
  // Token Generation

  const {email, password} = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({message: "User already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await userModel.create({
      email,
      password: hashedPassword
    })
    const token = jwt.sign({email: result.email})
  } catch (error) {

  }
} 

const login = (req, res) => {

}

module.exports = { signup, login }