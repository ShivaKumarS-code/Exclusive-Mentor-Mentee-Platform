import axios from "axios";

/**
 * Fetches the mentees selected by the mentor.
 * @param {string} mentorId - The ID of the mentor
 * @returns {Promise<Object>} - Returns an object with selected and unselected mentees
 */
export const fetchMentees = async (mentorId) => {
  try {
    const response = await axios.get(`/mentor/${mentorId}/mentees`);
    return response.data; // { selectedMentees: [], availableMentees: [] }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch mentees."
    );
  }
};

/**
 * Fetches the mentees selected by the mentor.
 * @param {string} mentorId - The ID of the mentor
 * @returns {Promise<Array>} - Array of selected mentees
 */
export const fetchSelectedMentees = async (mentorId) => {
  try {
    const response = await axios.get(`/mentor/${mentorId}/mentees/selected`);
    return response.data; // Array of selected mentees
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch selected mentees."
    );
  }
};

/**
 * Fetches the unselected mentees available for the mentor.
 * @returns {Promise<Array>} - Array of unselected mentees
 */
export const fetchUnselectedMentees = async () => {
  try {
    const response = await axios.get("/mentor/mentees/unselected");
    return response.data; // Array of unselected mentees
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch unselected mentees."
    );
  }
};

/**
 * Adds a mentee to the mentor's list.
 * @param {string} mentorId - The ID of the mentor
 * @param {string} menteeId - The ID of the mentee to add
 * @returns {Promise<Object>} - Contains the success message or updated mentor data
 */
export const addMentee = async (mentorId, menteeId) => {
  try {
    const response = await axios.post(`/mentor/${mentorId}/mentees/add`, {
      menteeId,
    });
    return response.data; // Expect success message or updated mentor data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add mentee.");
  }
};

/**
 * Removes a mentee from the mentor's list.
 * @param {string} menteeId - The ID of the mentee to remove
 * @returns {Promise<Object>} - Contains the success message or updated mentor data
 */
export const removeMentee = async (menteeId) => {
  try {
    const response = await axios.post(`/mentor/mentees/remove`, { menteeId });
    return response.data; // Expect success message or updated mentor data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to remove mentee."
    );
  }
};
