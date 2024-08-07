const mongoose = require("mongoose");

/**
 * Schema representing an appointment.
 * @typedef {Object} Appointment
 * @property {String} title - The title of the appointment.
 * @property {String} description - The description of the appointment.
 * @property {Date} date - The date of the appointment.
 * @property {String} time - The time of the appointment.
 * @property {mongoose.Schema.Types.ObjectId} scheduler - The user who scheduled the appointment.
 * @property {mongoose.Schema.Types.ObjectId} attendee - The user who is invited to the appointment.
 * @property {String} status - The status of the appointment (pending, accepted, declined, or canceled).
 */
const AppointmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    scheduler: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    attendee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "declined", "canceled"],
        default: "pending",
    },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
