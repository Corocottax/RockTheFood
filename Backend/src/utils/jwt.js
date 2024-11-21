const jwt = require("jsonwebtoken");

const generateKey = (id, expiresIn = "1y") => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: expiresIn });
};

const verifyKey = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateKey, verifyKey };
