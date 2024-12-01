import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments'); // Replace with your actual API URL
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data); // Assuming the API returns an array of appointments
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleAction = async (id, status) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH', // Adjust the method according to your API design
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error('Failed to update appointment status');
      }
      console.log(`Appointment ID ${id} is ${status}`);
      // Remove the appointment from the list after action
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== id)
      );
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const handleBack = () => {
    const userRole = localStorage.getItem('role'); // Assumes role is stored in localStorage
    if (userRole === 'mentor') {
      navigate('/mentor/dashboard');
    } else if (userRole === 'mentee') {
      navigate('/mentee/dashboard');
    } else {
      navigate('/'); // Default fallback
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-6 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        Back
      </button>

      {/* Header */}
      <h2 className="text-2xl font-semibold mb-4">Appointments</h2>

      {/* Appointments List */}
      {appointments.length === 0 ? (
        <p>No appointments to display.</p>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="border p-4 rounded-lg mb-4 bg-gray-100"
          >
            <p>
              <strong>From:</strong> {appointment.from}
            </p>
            <p>
              <strong>Role:</strong> {appointment.role}
            </p>
            <p>
              <strong>Date:</strong> {appointment.date}
            </p>
            <p>
              <strong>Time:</strong> {appointment.time}
            </p>
            <p>
              <strong>Reason:</strong> {appointment.reason}
            </p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => handleAction(appointment.id, 'Approved')}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={() => handleAction(appointment.id, 'Denied')}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewAppointment;
