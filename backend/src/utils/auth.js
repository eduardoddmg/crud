const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function comparePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

function generateToken(payload) {
  console.log(payload, process.env.JWT_SECRET)
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

module.exports = { hashPassword, comparePassword, generateToken };
