'use strict'
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  try {
    if (!token || (token && !token.startsWith("Bearer "))) {
        return res.status(403).send("A token is required for authentication");
    }
    token = token.slice(7, token.length);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;