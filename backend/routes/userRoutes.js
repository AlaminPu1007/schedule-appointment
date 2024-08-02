const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, userController.getUsers);
router.get("/search", auth, userController.searchUsers);

module.exports = router;
