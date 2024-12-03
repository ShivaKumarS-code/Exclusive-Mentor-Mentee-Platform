import React, { useEffect, useState } from "react";
import { fetchFeedbacksForMentor } from "../../api/feedbackApi.js";

const FeedbackView = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFeedbacksForMentor();
        setFeedbacks(data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-md overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Feedback Received</h2>
      </div>

      {/* Scrollable content */}
      <div className="max-h-96 overflow-y-auto p-4 space-y-4">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="p-4 border rounded-md shadow-sm bg-gray-100 hover:bg-gray-200 transition"
            >
              <p className="font-semibold text-gray-700 mb-1">
                Mentee: {feedback.mentee?.email || "Anonymous"}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">Feedback:</span> {feedback.text}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No feedback available.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackView;
