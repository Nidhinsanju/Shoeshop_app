const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.secret || "SecreT123"; // This should be in an environment variable in a real application

const authenticateJwt = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({
            message: "token mismatch",
          });
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({
        message: "No token found",
      });
    }
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  authenticateJwt,
  SECRET,
};
