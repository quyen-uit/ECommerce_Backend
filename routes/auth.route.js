const express = require("express");
const {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  deleteUser,
  updateCurUser,
} = require("../controllers/user.controller");
const { authMiddleware, isAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/all", authMiddleware, isAdmin, getUsers);
router.get("/:id", authMiddleware, isAdmin, getUserById);

router.post("/register", createUser);
router.post("/login", loginUser);

router.put("/edit", authMiddleware, updateCurUser);

router.delete("/:id", deleteUser);

module.exports = router;
