const express = require("express");
const {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  deleteUser,
} = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all", getUsers);
router.get("/:id", authMiddleware, getUserById);
router.delete("/:id", deleteUser);

module.exports = router;
