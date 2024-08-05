const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, userController.getUsers);
router.get("/search", auth, userController.searchUsers);
// Get user info by user ID
router.get("/:userId", auth, userController.getUserById);
// Get current user info
router.get("/current", auth, userController.getCurrentUser);

module.exports = router;
