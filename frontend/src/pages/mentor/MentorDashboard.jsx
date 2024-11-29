import React from "react";
import Sidebar from "../../components/Sidebar";

const MentorDashboard = () => {
  return (
    <div className="flex">
      <Sidebar role="mentor" />
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Welcome, Mentor</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Some Thoughts on Mentoring</h2>
          <p className="text-gray-700">
            As a mentor, your goal is to guide and support your mentee's growth. The
            journey of mentoring is mutually beneficial, as you will also learn and grow
            alongside your mentee.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
