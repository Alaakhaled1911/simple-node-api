const jwt = require("jsonwebtoken");

const generateJWT = async (payload) => {
  const token = jwt.sign(
    { ...payload, iat: Math.floor(Date.now() / 1000) }, // Add the issued-at time
    process.env.JWT_SECRET,
    { expiresIn: "10m" } // Adjust the expiration as needed
  );
  return token;
};

module.exports = generateJWT;
