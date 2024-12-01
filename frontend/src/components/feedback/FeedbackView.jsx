import React, { useEffect, useState } from "react";
import { fetchFeedbacks } from "../../api/feedbackApi.js"; // Import the fetchFeedbacks function

const FeedbackView = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch feedback data
    const fetchData = async () => {
      try {
        const data = await fetchFeedbacks();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Feedback Received
      </h2>

      {feedbacks.length > 0 ? (
        feedbacks.map((feedback, index) => (
          <div
            key={index}
            className="border p-6 mb-4 rounded-lg bg-gray-50 shadow-sm"
          >
            <p className="text-lg font-bold text-gray-800 mb-2">
              Mentee: {feedback.menteeName}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Feedback:</span> {feedback.text}
            </p>
            {feedback.attachment && (
              <a
                href={feedback.attachment}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Attachment
              </a>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No feedback available.</p>
      )}
    </div>
  );
};

export default FeedbackView;
