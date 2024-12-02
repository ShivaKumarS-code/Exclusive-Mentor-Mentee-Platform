import axios from "axios";

/**
 * Retrieves the `access_token` from localStorage.
 */
const getAccessToken = () => {
  return localStorage.getItem('accessToken'); // Adjust the key if stored differently
};

/**
 * Fetches all mentees assigned to the logged-in mentor.
 * @returns {Promise<Array>} - Array of mentees
 */
export const fetchSelectedMentees = async () => {
  try {
    const token = getAccessToken();
    const response = await axios.get(`/api/mentorships/mentees`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the access token
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch selected mentees."
    );
  }
};

/**
 * Removes a mentee from the mentor's list.
 * @param {string} menteeId - The ID of the mentee to remove
 * @returns {Promise<Object>} - Success message from the backend
 */
export const removeMentee = async (menteeId) => {
  try {
    // Get the access token from local storage
    const token = getAccessToken();
    
    if (!token) {
      throw new Error("Unauthorized: No access token found.");
    }

    // Validate menteeId
    if (!menteeId || typeof menteeId !== "string" || menteeId.length !== 24) {
      throw new Error("Invalid mentee ID format.");
    }

    // Make the POST request to unassign the mentee
    const response = await axios.post(
      "/api/mentorships/unassign", // Backend endpoint for unassigning
      { menteeId }, // Send the menteeId in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the access token in the Authorization header
        },
      }
    );

    // Return the success message from the response
    return response.data.message; 
  } catch (error) {
    // Handle errors and throw a descriptive error message
    const errorMessage =
      error.response?.data?.message || "An error occurred while removing the mentee.";
    throw new Error(errorMessage);
  }
};
