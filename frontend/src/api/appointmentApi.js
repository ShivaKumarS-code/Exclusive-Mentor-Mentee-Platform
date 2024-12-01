import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token'); // Ensure this matches your login implementation
};

// Submit an appointment
export const submitAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/appointments`,
      appointmentData,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Include the token
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to submit appointment';
  }
};

// Fetch appointments (sent by other users)
export const fetchAppointments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointments/received`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Include the token
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch appointments';
  }
};

// Update appointment status (approved/denied)
export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/appointments/${appointmentId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Include the token
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update appointment status';
  }
};
