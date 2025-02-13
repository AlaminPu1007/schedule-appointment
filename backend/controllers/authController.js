const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { errorHandler } = require("../utils/errorHandler");

/**
 * Register a new user.
 * @param {Object} req - The request object containing user details.
 * @param {Object} res - The response object to send the result or error.
 */
exports.register = async (req, res) => {
    const { name, username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        user = new User({ name, username, password });
        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
            if (err) throw err;
            res.json({ token, userId: user.id });
        });
    } catch (err) {
        errorHandler(err, res);
    }
};

/**
 * Log in an existing user.
 * @param {Object} req - The request object containing login credentials.
 * @param {Object} res - The response object to send the result or error.
 */
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
            if (err) throw err;
            res.json({ token, userId: user.id });
        });
    } catch (err) {
        errorHandler(err, res);
    }
};
