const User = require("../models/User");
const { errorHandler } = require("../utils/errorHandler");

exports.getUsers = async (req, res) => {
    try {
        // Parse page and limit from query parameters, with default values
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;

        const { id = null } = req.user;

        // Fetch the users with pagination
        const users = await User.find({ _id: { $ne: id } }) // Exclude current user by ID
            .select("-password") // Exclude password field
            .skip(skip)
            .limit(limit);

        // Get total count of users
        const totalUsers = await User.countDocuments();

        // Prepare the response
        const response = {
            users,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page,
        };

        res.json(response);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.searchUsers = async (req, res) => {
    const { query, page = 1, limit = 10 } = req.query;

    try {
        const skip = (page - 1) * limit;

        const users = await User.find({
            $or: [{ username: { $regex: query, $options: "i" } }, { name: { $regex: query, $options: "i" } }],
        })
            .select("-password")
            .skip(skip)
            .limit(parseInt(limit));

        const totalUsers = await User.countDocuments({
            $or: [{ username: { $regex: query, $options: "i" } }, { name: { $regex: query, $options: "i" } }],
        });

        const response = {
            users,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: parseInt(page),
        };

        res.json(response);
    } catch (err) {
        errorHandler(err, res);
    }
};

/*
 * Get user info by user ID
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
exports.getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        errorHandler(err, res);
    }
};

/*
 * Get current user info
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
exports.getCurrentUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        errorHandler(err, res);
    }
};
