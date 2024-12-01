import axios from "axios";

// Submit feedback API
export const submitFeedback = async (formData) => {
  try {
    const response = await axios.post("/api/feedback", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
};

// Fetch feedback API
export const fetchFeedbacks = async () => {
  try {
    const response = await axios.get("/api/feedback");
    return response.data;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    throw error;
  }
};
