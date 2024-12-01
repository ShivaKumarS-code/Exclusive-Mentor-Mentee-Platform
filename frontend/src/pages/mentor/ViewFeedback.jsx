import React from "react";
import Sidebar from "../../components/Sidebar";
import FeedbackView from "../../components/feedback/FeedbackView"; // Adjust the path based on your directory structure

const ViewFeedback = () => {
  return (
    <div className="flex">
      {/* Sidebar for navigation */}
      <Sidebar role="mentor" />

      {/* Main content area */}
      <div className="flex-grow p-6">
        <h1 className="text-xl font-bold mb-4">View Feedback</h1>

        {/* Include FeedbackView Component */}
        <FeedbackView />
      </div>
    </div>
  );
};

export default ViewFeedback;
