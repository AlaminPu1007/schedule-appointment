const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const auth = require("../middlewares/authMiddleware");

router.post("/", auth, appointmentController.createAppointment);
router.get("/", auth, appointmentController.getAppointments);
router.get("/search", auth, appointmentController.searchAppointments);
router.put("/cancel/:id", auth, appointmentController.cancelAppointment);
// Route to get a single appointment by ID
router.get("/:id", appointmentController.getAppointmentById);
// Route to get appointment history for a specific user
router.get("/user/:userId", appointmentController.getAppointmentsByUser);

module.exports = router;
