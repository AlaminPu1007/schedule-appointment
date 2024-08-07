const mongoose = require("mongoose");

/**
 * Connects to MongoDB using the URI from environment variables.
 * Logs success or error message based on the connection outcome.
 *
 * @async
 * @function
 */

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected...");
    } catch (err) {
        console.error(err.message, "from db-connection");
        process.exit(1);
    }
};

module.exports = connectDB;
