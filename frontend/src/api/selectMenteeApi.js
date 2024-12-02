import axios from "axios";

/**
 * Fetches all unselected mentees available for assignment to a mentor.
 * @returns {Promise<Array>} - Array of unselected mentees
 */
export const fetchUnselectedMentees = async () => {
  try {
    const token = localStorage.getItem("accessToken"); // Assuming the token is stored in localStorage after login
    
    if (!token) {
      throw new Error("No authorization token found");
    }

    const response = await axios.get("/api/mentorships/available", {
      headers: {
        Authorization: `Bearer ${token}`, // Send the token as Bearer in the Authorization header
      },
    });

    // If the API response has no 'mentees' key or it's empty, handle it
    if (!response.data || !response.data.mentees || response.data.mentees.length === 0) {
      throw new Error("No mentees available");
    }

    return response.data.mentees; // Return the mentees array from the response
  } catch (error) {
    console.error("Error fetching mentees:", error); // Log the error to see what's wrong
    throw new Error("Error fetching unselected mentees: " + error.message);
  }
};


/**
 * Adds a mentee to the mentor's list.
 * @param {string} mentorId - The ID of the mentor
 * @param {string} menteeId - The ID of the mentee to add
 * @returns {Promise<Object>} - Returns the success message from the backend
 */
export const addMentee = async (mentorId, menteeId) => {
  try {
    const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage
    
    if (!token) {
      throw new Error("No authorization token found");
    }

    const response = await axios.post("/api/mentorships/assign", {
      mentorId,
      menteeId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`, // Send the token as Bearer in the Authorization header
      },
    });
    return response.data.message; // Expecting a success message or updated mentor data
  } catch (error) {
    throw new Error("Error adding mentee: " + error.message);
  }
};
