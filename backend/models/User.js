const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * Schema representing a user.
 * @typedef {Object} User
 * @property {String} username - The unique username of the user.
 * @property {String} name - The full name of the user.
 * @property {String} password - The hashed password of the user.
 */

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

/**
 * Middleware to hash the password before saving the user.
 * @param {Function} next - The next middleware function.
 * @return {Promise<void>}
 */
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model("User", UserSchema);
