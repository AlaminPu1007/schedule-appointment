const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const auth = require("../middlewares/authMiddleware");

/**
 * @route POST /appointments
 * @description Create a new appointment
 * @access Private
 */
router.post("/", auth, appointmentController.createAppointment);

/**
 * @route GET /appointments/all
 * @description Get all appointments
 * @access Private
 */
router.get("/all", auth, appointmentController.getAppointments);

/**
 * @route GET /appointments
 * @description Get all appointments for the current user
 * @access Private
 */
router.get("/", auth, appointmentController.getAppointmentsOfCurrentUser);

/**
 * @route GET /appointments/search
 * @description Search for appointments with optional filters
 * @access Private
 */
router.get("/search", auth, appointmentController.searchAppointments);

/**
 * @route PUT /appointments/cancel/:id
 * @description Cancel an appointment by ID
 * @access Private
 */
router.put("/cancel/:id", auth, appointmentController.cancelAppointment);

/**
 * @route GET /appointments/:id
 * @description Get an appointment by ID
 * @access Public
 */
router.get("/:id", appointmentController.getAppointmentById);

/**
 * @route GET /appointments/user/:userId
 * @description Get all appointments for a specific user
 * @access Public
 */
router.get("/user/:userId", appointmentController.getAppointmentsByUser);

/**
 * @route PUT /appointments/accept/:id
 * @description Accept an appointment by ID
 * @access Private
 */
router.put("/accept/:id", auth, appointmentController.acceptAppointment);

module.exports = router;
