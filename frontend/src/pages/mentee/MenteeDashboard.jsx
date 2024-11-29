import React from "react";
import Sidebar from "../../components/Sidebar";

const MenteeDashboard = () => {
  return (
    <div className="flex">
      <Sidebar role="mentee" />
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Welcome, Mentee</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Some Thoughts on Coding</h2>
          <p className="text-gray-700">
            As a mentee, the process of coding and problem-solving can be challenging, but
            it's a rewarding experience. Stay consistent and seek guidance from your mentor
            whenever needed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MenteeDashboard;
