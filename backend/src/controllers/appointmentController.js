import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

// Create a new appointment
export const createAppointment = async (req, res) => {
  const { to, date, time, reason } = req.body;
  const from = req.user.id; // Assuming `req.user` contains the authenticated user's ID (from middleware)

  try {
    if (from === to) {
      return res.status(400).json({ message: "You cannot book an appointment with yourself." });
    }

    // Check if the 'to' user exists
    const recipient = await User.findById(to);
    if (!recipient) {
      return res.status(404).json({ message: "The user you are trying to book with does not exist." });
    }

    const newAppointment = new Appointment({
      from,
      to,
      date,
      time,
      reason,
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment request sent successfully!", appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment", error: error.message });
  }
};

// Fetch appointments (sent by others) for the logged-in user
export const getReceivedAppointments = async (req, res) => {
  const userId = req.user.id;

  try {
    const appointments = await Appointment.find({ to: userId })
      .populate("from", "username role") // Populate the 'from' field with user details
      .sort({ createdAt: -1 }); // Sort by the newest first

    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error: error.message });
  }
};

// Fetch appointments (sent by the logged-in user)
export const getSentAppointments = async (req, res) => {
  const userId = req.user.id;

  try {
    const appointments = await Appointment.find({ from: userId })
      .populate("to", "username role") // Populate the 'to' field with user details
      .sort({ createdAt: -1 }); // Sort by the newest first

    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error: error.message });
  }
};

// Update appointment status
export const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params; // Appointment ID
  const { status } = req.body; // Status can be "approved" or "denied"
  const userId = req.user.id; // Assuming `req.user` contains the authenticated user's ID (from middleware)

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Ensure only the recipient can update the appointment status
    if (appointment.to.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to update this appointment." });
    }

    if (!["approved", "denied"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Status must be 'approved' or 'denied'." });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({ message: `Appointment ${status} successfully!`, appointment });
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment status", error: error.message });
  }
};
