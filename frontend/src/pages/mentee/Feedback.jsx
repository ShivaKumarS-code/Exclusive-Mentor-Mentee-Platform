import React from "react";
import Sidebar from "../../components/Sidebar";
import FeedbackForm from "../../components/feedback/FeedbackForm"
import { useNavigate } from "react-router-dom";

const Feedback = ({ submitFeedback }) => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <Sidebar role="mentee" />
      <div className="flex-grow p-6">
        <h1 className="text-xl font-bold mb-4">Feedback</h1>

        <FeedbackForm submitFeedback={submitFeedback} />
      </div>
    </div>
  );
};

export default Feedback;
