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

        await appointment.save();
        res.json(appointment);
    } catch (err) {
        errorHandler(err, res);
    }
};

// exports.searchAppointments = async (req, res) => {
//     const { query = "", filter = "all" } = req.query;
//     const userId = req.user.id;
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // Set time to midnight

//     try {
//         // Initialize query object with title search and user filtering
//         let queryObject = {
//             title: { $regex: query, $options: "i" },
//             $or: [{ scheduler: userId }, { attendee: userId }],
//         };

//         // Add date filtering based on the filter parameter
//         if (filter === "upcoming") {
//             queryObject.date = { $gte: today }; // Only upcoming appointments
//         } else if (filter === "past") {
//             queryObject.date = { $lt: today }; // Only past appointments
//         }

//         const appointments = await Appointment.find(queryObject)
//             .populate("scheduler", "name")
//             .populate("attendee", "name");

//         res.json(appointments);
//     } catch (err) {
//         errorHandler(err, res);
//     }
// };

exports.searchAppointments = async (req, res) => {
    const { query = "", filter = "all", page = 1, limit = 10 } = req.query;
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight

    // Ensure page and limit are numbers and not negative
    const pageNumber = Math.max(parseInt(page), 1);
    const limitNumber = Math.max(parseInt(limit), 1);

    try {
        // Initialize query object with title search and user filtering
        let queryObject = {
            title: { $regex: query, $options: "i" },
            $or: [{ scheduler: userId }, { attendee: userId }],
        };

        // Add date filtering based on the filter parameter
        if (filter === "upcoming") {
            queryObject.date = { $gte: today }; // Only upcoming appointments
        } else if (filter === "past") {
            queryObject.date = { $lt: today }; // Only past appointments
        }

        // Get the total count of matching documents
        const totalAppointments = await Appointment.countDocuments(queryObject);

        // Fetch the appointments with pagination
        const appointments = await Appointment.find(queryObject)
            .populate("scheduler", "name")
            .populate("attendee", "name")
            .skip((pageNumber - 1) * limitNumber) // Skip documents for pagination
            .limit(limitNumber); // Limit the number of documents per page

        res.json({
            totalAppointments,
            totalPages: Math.ceil(totalAppointments / limitNumber),
            currentPage: pageNumber,
            appointments,
        });
    } catch (err) {
        errorHandler(err, res);
    }
};

// get appoint of logging user
// exports.getAppointmentsOfCurrentUser = async (req, res) => {
//     try {
//         const userId = req.user.id;

//         const appointments = await Appointment.find({
//             $or: [{ scheduler: userId }, { attendee: userId }],
//         })
//             .populate("scheduler", "name")
//             .populate("attendee", "name");

//         res.json(appointments);
//     } catch (err) {
//         errorHandler(err, res);
//     }
// };

exports.getAppointmentsOfCurrentUser = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user.id;

    // Ensure page and limit are numbers and not negative
    const pageNumber = Math.max(parseInt(page), 1);
    const limitNumber = Math.max(parseInt(limit), 1);

    try {
        // Get the total count of matching documents
        const totalAppointments = await Appointment.countDocuments({
            $or: [{ scheduler: userId }, { attendee: userId }],
        });

        // Fetch the appointments with pagination
        const appointments = await Appointment.find({
            $or: [{ scheduler: userId }, { attendee: userId }],
        })
            .populate("scheduler", "name")
            .populate("attendee", "name")
            .skip((pageNumber - 1) * limitNumber) // Skip documents for pagination
            .limit(limitNumber); // Limit the number of documents per page

        res.json({
            totalAppointments,
            totalPages: Math.ceil(totalAppointments / limitNumber),
            currentPage: pageNumber,
            appointments,
        });
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

exports.acceptAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the appointment by ID
        const appointment = await Appointment.findById(id);

        // Check if the appointment exists
        if (!appointment) {
            return res.status(404).json({ msg: "Appointment not found" });
        }

        // Check if the user is authorized to accept the appointment
        // Only the attendee can accept the appointment
        if (appointment.attendee.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }

        // Check if the appointment is still pending
        if (appointment.status !== "pending") {
            return res.status(400).json({ msg: "Appointment cannot be accepted" });
        }

        // Update the appointment status to "accepted"
        appointment.status = "accepted";
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
