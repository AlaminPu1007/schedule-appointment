const mongoose = require("mongoose");

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
