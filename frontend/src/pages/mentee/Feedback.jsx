import React from "react";
import Sidebar from "../../components/Sidebar";
import FeedbackForm from "../../components/feedback/FeedbackForm";
import { submitFeedback } from "../../api/feedbackApi"; // Import API function

const Feedback = () => {
  return (
    <div className="flex">
      <Sidebar role="mentee" />
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-6">Submit Feedback</h1>
        <p className="text-gray-600 mb-4">
          Share your thoughts and experience with your mentor. Your feedback helps us improve the mentoring experience.
        </p>

        <FeedbackForm submitFeedback={submitFeedback} />
      </div>
    </div>
  );
};

export default Feedback;
