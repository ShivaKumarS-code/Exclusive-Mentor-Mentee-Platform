import Appointment from '../models/Appointment.js';

// Create a new appointment
export const createAppointment = async (req, res) => {
  const { mentor, mentee, date, status } = req.body;
  
  try {
    const newAppointment = new Appointment({ mentor, mentee, date, status });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment' });
  }
};

// Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ $or: [{ mentor: req.user.id }, { mentee: req.user.id }] });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};
