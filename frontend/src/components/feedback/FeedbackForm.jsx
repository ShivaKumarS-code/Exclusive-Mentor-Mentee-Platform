import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FeedbackForm = ({ submitFeedback }) => {
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // State to handle submission loading
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false); // State to handle successful submission message

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedbackText) {
      return alert("Please provide feedback.");
    }

    const formData = { text: feedbackText };

    try {
      setIsSubmitting(true);
      await submitFeedback(formData);
      setFeedbackSubmitted(true); // Show success message
      setFeedbackText(""); // Reset fields after successful submission
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
      alert(`Failed to submit feedback: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto border-2 border-yellow-500 p-6 translate-y-1/3 bg-zinc-800 rounded-3xl">
      <h2 className="text-2xl font-bold mb-4">Your Feedback</h2>
      {feedbackSubmitted && (
        <div className="bg-green-100 text-green-700 p-4 mb-4 rounded-md">
          Feedback submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border bg-zinc-700 border-purple-500 rounded-md p-3 mb-4 focus:outline-none"
          rows="5"
          placeholder="Write your feedback here..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        ></textarea>

        <button
          type="submit"
          className={`w-full bg-purple-500 text-black hover:text-white px-4 py-2 rounded-xl hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isSubmitting ? "cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
