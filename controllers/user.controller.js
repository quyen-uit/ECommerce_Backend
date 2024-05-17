const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });

  if (!user) {
    // create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User already exists");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.isMatchedPassword(password, user.password))) {
    res.json({
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      mobile: newUser.mobile,
      email: newUser.email,
      role: newUser.role,
      token: generateToken(newUser._id),
    });
  } else {
    throw new Error("Invalid password");
  }
});

module.exports = { createUser, loginUser };
