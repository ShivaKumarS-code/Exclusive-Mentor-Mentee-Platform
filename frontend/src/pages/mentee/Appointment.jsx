import React, { useState, useEffect } from 'react';
import { getAppointments } from '../../utils/api'; // API function to fetch appointments

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const data = await getAppointments('mentee'); // Replace with actual mentee ID
      setAppointments(data);
    };
    fetchAppointments();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id} className="mb-4 p-4 bg-gray-100 rounded-lg">
            <p>{appointment.date}</p>
            <p>{appointment.time}</p>
            <p>{appointment.reason}</p>
            <p>{appointment.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointment;
