import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAppointments, updateAppointmentStatus } from '../../api/appointmentApi';

const ViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const data = await fetchAppointments();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    getAppointments();
  }, []);

  const handleAction = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === id ? { ...appointment, status } : appointment
        )
      );
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const handleBack = () => {
    const userRole = localStorage.getItem('role');
    if (userRole === 'mentor') {
      navigate('/mentor/appointments');
    } else if (userRole === 'mentee') {
      navigate('/mentee/appointments');
    } else {
      navigate('/'); // Default fallback
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <button
        onClick={handleBack}
        className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        Back
      </button>
      <h2 className="text-2xl font-semibold mt-4">Your Appointments</h2>
      <ul className="space-y-4 mt-4">
        {appointments.map((appointment) => (
          <li key={appointment._id} className="p-4 bg-gray-100 rounded-lg">
            <p><strong>Date:</strong> {appointment.date}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
            <p><strong>Reason:</strong> {appointment.reason}</p>
            <p><strong>Status:</strong> {appointment.status}</p>
            {appointment.status === 'Pending' && (
              <div className="space-x-4 mt-2">
                <button
                  onClick={() => handleAction(appointment._id, 'Accepted')}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleAction(appointment._id, 'Rejected')}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAppointment;
