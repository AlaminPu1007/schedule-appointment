const jwt = require("jsonwebtoken");

/**
 * Middleware to verify JWT token and attach the decoded user to the request object.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 * @return {void}
 */

module.exports = (req, res, next) => {
    // Extract token from Authorization header
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};
