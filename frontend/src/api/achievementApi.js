import axios from 'axios';

// Define the base URL of your backend API
const API_URL = '/api/achievements'; // Update with your actual API URL

// Helper function to get the access token from local storage
const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

// API function to upload achievement as a mentee
export const uploadAchievement = async (achievementText) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await axios.post(
      `${API_URL}/upload`,
      { achievementText },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error uploading achievement:', error);
    throw error.response?.data || error.message;
  }
};

// API function to view mentee's own achievements
export const viewSelfAchievements = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await axios.get(`${API_URL}/self`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.achievements;
  } catch (error) {
    console.error('Error fetching achievements:', error);
    throw error.response?.data || error.message;
  }
};

// API function to view assigned mentees' achievements (for mentors)
export const viewMenteesAchievements = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await axios.get(`${API_URL}/mentees`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.achievements;
  } catch (error) {
    console.error('Error fetching mentees achievements:', error);
    throw error.response?.data || error.message;
  }
};
