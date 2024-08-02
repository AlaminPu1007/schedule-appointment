const User = require("../models/User");
const { errorHandler } = require("../utils/errorHandler");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.searchUsers = async (req, res) => {
    const { query } = req.query;

    try {
        const users = await User.find({ username: { $regex: query, $options: "i" } }).select("-password");
        res.json(users);
    } catch (err) {
        errorHandler(err, res);
    }
};
