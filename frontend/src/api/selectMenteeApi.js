// src/utils/selectMenteeApi.js

import axios from "axios";

// Fetch the list of mentees for a specific mentor (assigned and unassigned)
export const fetchAvailableMentees = async (mentorId) => {
  try {
    const response = await axios.get(`/api/mentor/${mentorId}/mentees`);
    return response.data.mentees; // Assuming the response contains a 'mentees' array
  } catch (error) {
    throw new Error("Error fetching available mentees: " + error.message);
  }
};

// Select a mentee for a mentor
export const selectMentee = async (mentorId, menteeId) => {
  try {
    const response = await axios.post("/api/mentor/select", {
      mentorId,
      menteeId,
    });
    return response.data.message; // Return the message from the backend
  } catch (error) {
    throw new Error("Error selecting mentee: " + error.message);
  }
};

// Unselect a mentee for a mentor
export const unselectMentee = async (mentorId, menteeId) => {
  try {
    const response = await axios.post("/api/mentor/unselect", {
      mentorId,
      menteeId,
    });
    return response.data.message; // Return the message from the backend
  } catch (error) {
    throw new Error("Error unselecting mentee: " + error.message);
  }
};
