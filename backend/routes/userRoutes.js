const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");

/**
 * @route GET /users
 * @description Get a list of users
 * @access Private
 */
router.get("/", auth, userController.getUsers);

/**
 * @route GET /users/search
 * @description Search for users with optional filters
 * @access Private
 */
router.get("/search", auth, userController.searchUsers);

/**
 * @route GET /users/:userId
 * @description Get user information by user ID
 * @access Private
 */
router.get("/:userId", auth, userController.getUserById);

/**
 * @route GET /users/current
 * @description Get the current authenticated user's information
 * @access Private
 */
router.get("/current", auth, userController.getCurrentUser);

module.exports = router;
