const Appointment = require("../models/Appointment");
const { errorHandler } = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

exports.createAppointment = async (req, res) => {
    const { title, description, date, time, attendee } = req.body;

    try {
        const appointment = new Appointment({
            title,
            description,
            date,
            time,
            scheduler: req.user.id,
            attendee,
        });
        console.log(appointment, "from backend");

        await appointment.save();
        res.json(appointment);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate("scheduler", "name").populate("attendee", "name");
        res.json(appointments);
    } catch (err) {
        errorHandler(err, res);
    }
};

// get appoint of logging user
exports.getAppointmentsOfCurrentUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { id: userId } = decoded.user || {};

        const appointments = await Appointment.find({
            $or: [{ scheduler: userId }, { attendee: userId }],
        })
            .populate("scheduler", "name")
            .populate("attendee", "name");

        res.json(appointments);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.searchAppointments = async (req, res) => {
    const { query = "", filter = "all" } = req.query;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight
    console.log(req.query);

    try {
        // Initialize query object with title search
        let queryObject = {
            title: { $regex: query, $options: "i" },
        };

        // Add date filtering based on the filter parameter
        if (filter === "upcoming") {
            queryObject.date = { $gte: today }; // Only upcoming appointments
        } else if (filter === "past") {
            queryObject.date = { $lt: today }; // Only past appointments
        }

        const appointments = await Appointment.find(queryObject)
            .populate("scheduler", "name")
            .populate("attendee", "name");

        res.json(appointments);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.cancelAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({ msg: "Appointment not found" });
        }

        if (appointment.scheduler.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }

        appointment.status = "canceled";
        await appointment.save();
        res.json(appointment);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.getAppointmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findById(id)
            .populate("scheduler", "username")
            .populate("attendee", "username");

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.json(appointment);
    } catch (err) {
        errorHandler(err, res);
    }
};

exports.getAppointmentsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const appointments = await Appointment.find({
            $or: [{ scheduler: userId }, { attendee: userId }],
        })
            .populate("scheduler", "username")
            .populate("attendee", "username");

        res.json(appointments);
    } catch (err) {
        errorHandler(err, res);
    }
};
