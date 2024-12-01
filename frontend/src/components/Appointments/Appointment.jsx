import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: '',
  });
  const [appointmentStatus, setAppointmentStatus] = useState(''); // Approving, Approved, or Denied
  const navigate = useNavigate(); // Hook to navigate between routes

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make API call to submit the appointment
    console.log('Appointment submitted:', formData);
    setAppointmentStatus('Approving');
  };

  const handleViewAppointments = () => {
    // Get role from localStorage
    const userRole = localStorage.getItem('role'); // Assumes 'role' is stored in localStorage
    if (userRole === 'mentor') {
      navigate('/mentor/view-appointments'); // Mentor-specific route
    } else if (userRole === 'mentee') {
      navigate('/mentee/view-appointments'); // Mentee-specific route
    } else {
      console.error('Invalid role detected or role not set in localStorage.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Schedule an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Reason</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {appointmentStatus && (
        <p className="mt-4 text-gray-700">
          Status: <span className="font-bold">{appointmentStatus}</span>
        </p>
      )}
      <button
        onClick={handleViewAppointments}
        className="mt-6 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        View Appointments
      </button>
    </div>
  );
};

export default Appointment;
