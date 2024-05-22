const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { UserRole } = require("../constants/app.const");

// verify token and get current user
const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
        const user = await User.findById(decoded?.id);
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

// check admin user
const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.role !== UserRole.Admin) {
    throw new Error("User is not an admin");
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
