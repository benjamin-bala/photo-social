require('dotenv').config();
const JWT_SECRET = process.env.JWT_KEY;
const jwt = require('jsonwebtoken');

function verifyToken(token) {
  try {
    const verify = jwt.verify(token, JWT_SECRET);

    if (verify) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(JSON.stringify(error), 'error');
    return false;
  }
}

module.exports = verifyToken;
