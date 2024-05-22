const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
        const user = User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch {
      throw new Error("Not authorized.");
    }
  } else {
    throw new Error("There is no token.");
  }
});

module.exports = { authMiddleware };
