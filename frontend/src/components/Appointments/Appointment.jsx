import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitAppointment } from '../../api/appointmentApi';
import axios from 'axios';

const Appointment = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: '',
    mentee: '',
    mentor: '', // For mentee, populated automatically
  });
  const [assignedMentees, setAssignedMentees] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();

  const userRole = localStorage.getItem('role');
  const accessToken = localStorage.getItem('accessToken');
  
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(atob(base64));
      return decoded;
    } catch (e) {
      return null;
    }
  };

  const userId = accessToken ? parseJwt(accessToken)?.id : null;

  useEffect(() => {
    if (userRole === 'mentor' && userId) {
      axios.get(`/api/appointments/assigned-mentees`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((response) => setAssignedMentees(response.data))
        .catch((error) => console.error('Error fetching mentees:', error));
    } else if (userRole === 'mentee' && userId) {
      // Fetch assigned mentor for mentee
      axios.get(`/api/appointments/mentor`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((response) => setFormData((prev) => ({ ...prev, mentor: response.data._id })))
        .catch((error) => console.error('Error fetching mentor:', error));
    }
  }, [userRole, userId, accessToken]);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userRole === 'mentor' && !formData.mentee) {
        setStatusMessage('Please select a mentee.');
        return;
      }
      await submitAppointment(formData);
      setStatusMessage('Appointment successfully submitted!');
    } catch (error) {
      setStatusMessage(error.message);
    }
  };

  const handleViewAppointments = () => {
    navigate(userRole === 'mentor' ? '/mentor/view-appointments' : '/mentee/view-appointments');
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
        {userRole === 'mentor' && (
          <div>
            <label className="block text-gray-700">Select Mentee</label>
            <select
              name="mentee"
              value={formData.mentee}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="">Select a mentee</option>
              {assignedMentees.map((mentee) => (
                <option key={mentee._id} value={mentee._id}>
                  {mentee.username} ({mentee.email})
                </option>
              ))}
            </select>
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {statusMessage && <p className="mt-4 text-gray-700">{statusMessage}</p>}
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
