const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1y' }
  );
};


const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};


module.exports = { generateToken, verifyJwt };