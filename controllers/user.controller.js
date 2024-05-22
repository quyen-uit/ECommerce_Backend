const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../services/jwtToken.service");

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
      firstname: user.firstname,
      lastname: user.lastname,
      mobile: user.mobile,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Invalid password");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    res.json({ user });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    res.json({ user });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createUser, loginUser, getUsers, getUserById, deleteUser };
