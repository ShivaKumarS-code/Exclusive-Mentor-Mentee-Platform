// ViewFeedback.jsx
import React from "react";
import Sidebar from "../../components/Sidebar";
import FeedbackView from "../../components/feedback/FeedbackView"; // Adjust the path based on your directory structure

const ViewFeedback = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for navigation */}
      <Sidebar role="mentor" />

      {/* Main content area */}
      <div className="flex-grow flex flex-col p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">View Feedback</h1>

        {/* FeedbackView Component in a scrollable container */}
        <div className="flex-grow">
          <FeedbackView />
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;
