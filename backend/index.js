const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

/**
 * Connect to the MongoDB database.
 */
connectDB();

/**
 * Initialize middleware.
 */
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables Cross-Origin Resource Sharing

/**
 * Root route for the application.
 * @route GET /
 * @returns {string} Hello World message
 */
app.get("/", (req, res) => {
    res.send("Hello World");
});

/**
 * Route for authentication-related operations.
 * @route /api/v1/auth
 */
app.use("/api/v1/auth", authRoutes);

/**
 * Route for user-related operations.
 * @route /api/v1/users
 */
app.use("/api/v1/users", userRoutes);

/**
 * Route for appointment-related operations.
 * @route /api/v1/appointments
 */
app.use("/api/v1/appointments", appointmentRoutes);

/**
 * Start the server and listen on a specified port.
 * @param {number} PORT - The port on which the server listens.
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
