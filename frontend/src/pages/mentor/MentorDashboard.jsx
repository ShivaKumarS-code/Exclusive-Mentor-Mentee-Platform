import React, { useState, useEffect } from 'react';
import { fetchAppointments, updateAppointmentStatus } from '../../api/appointmentApi';
import Sidebar from '../../components/Sidebar';

const MentorDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const data = await fetchAppointments();
        const currentDateTime = new Date();
        // Filter and sort appointments
        const upcomingAppointments = data
          .filter((appointment) => new Date(appointment.date) >= currentDateTime)
          .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by closest date
        setAppointments(upcomingAppointments);
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

  return (
    <div className="flex h-screen">
      <Sidebar role="mentor" />
      <div className="flex-1 p-8 text-white bg-black border-l-4 border-purple-700 rounded-l-[50px] overflow-y-auto">
        <h1 className="text-3xl font2 font-bold mb-4">Welcome, <span className='text-purple-500 font2'>Mentor!</span></h1>
        <div className="bg-black p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font2 font-semibold mb-4">Upcoming Appointments</h2>
          {appointments.length === 0 ? (
            <p className="text-blue-700">No upcoming appointments available.</p>
          ) : (
            <ul className="space-y-4">
              {appointments.map((appointment) => (
                <li key={appointment._id} className="p-4 bg-zinc-700 rounded-3xl border border-yellow-500">
                  <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
