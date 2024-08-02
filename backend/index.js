const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect to database
connectDB();

// Init Middleware
app.use(express.json());

// enabled cors
app.use(cors());

// Root Route
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/appointments", appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
