import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FeedbackForm = ({ submitFeedback }) => {
  const [feedbackText, setFeedbackText] = useState("");
  const [attachment, setAttachment] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!feedbackText && !attachment) {
      alert("Please provide feedback or attach a file.");
      return;
    }

    const formData = new FormData();
    formData.append("feedbackText", feedbackText);
    if (attachment) {
      formData.append("attachment", attachment);
    }

    submitFeedback(formData);

    // Reset fields after submission
    setFeedbackText("");
    setAttachment(null);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Your Feedback</h2>

      <textarea
        className="w-full border rounded-md p-2 mb-4"
        rows="5"
        placeholder="Write your feedback here..."
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
      ></textarea>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-4"
      >
        Submit Feedback
      </button>

    </form>
  );
};

export default FeedbackForm;
