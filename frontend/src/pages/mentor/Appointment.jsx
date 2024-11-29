import React, { useState, useEffect } from 'react';
import { getAppointments } from '../../utils/api'; // API function to fetch appointments

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const data = await getAppointments('mentor'); // Replace with actual mentor ID
      setAppointments(data);
    };
    fetchAppointments();
  }, []);

  const handleApprove = (appointmentId) => {
    // Handle approve logic (e.g., update the appointment status via API)
  };

  const handleReject = (appointmentId) => {
    // Handle reject logic (e.g., update the appointment status via API)
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id} className="mb-4 p-4 bg-gray-100 rounded-lg">
            <p>{appointment.date}</p>
            <p>{appointment.time}</p>
            <p>{appointment.reason}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleApprove(appointment._id)}
                className="bg-green-500 py-2 px-4 rounded hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(appointment._id)}
                className="bg-red-500 py-2 px-4 rounded hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointment;
