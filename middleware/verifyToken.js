const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Get the Authorization header
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];

  // Ensure the Authorization header exists
  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header is missing",
    });
  }

  // Extract the token
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      message: "Authorization header format must be 'Bearer <token>'",
    });
  }

  const token = parts[1];

  // Verify the token
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    req.user = decodedToken; // Optional: Attach the decoded token to the request
    next(); // Move to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = verifyToken;
