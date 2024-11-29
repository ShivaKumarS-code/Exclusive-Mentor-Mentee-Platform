import React, { useState } from 'react';
import { submitFeedback } from '../../utils/api'; // Same feedback submission API for mentee

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmitFeedback = async () => {
    if (feedback.trim()) {
      await submitFeedback('mentee', feedback); // Submit mentee feedback
      setFeedback('');
      setMessage('Feedback submitted successfully!');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Provide Feedback</h2>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="border border-gray-300 rounded-lg p-4 w-full mt-4"
        placeholder="Write your feedback..."
      />
      <div className="mt-4">
        <button
          onClick={handleSubmitFeedback}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Submit Feedback
        </button>
        {message && <p className="mt-2 text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default Feedback;
