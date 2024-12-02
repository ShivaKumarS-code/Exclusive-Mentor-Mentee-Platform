import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { fetchSelectedMentees, removeMentee } from "../../api/yourMenteeApi";

const YourMentee = () => {
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch selected mentees for the mentor
  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const selectedMentees = await fetchSelectedMentees(); // Fetch mentees without passing mentorId
        setMentees(selectedMentees);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching selected mentees:", error);
        setLoading(false);
      }
    };

    fetchMentees();
  }, []);

  // Remove mentee from the mentor's list
  const handleRemoveMentee = async (menteeId) => {
    try {
      const response = await removeMentee(menteeId); // Just pass menteeId here
      if (response) {
        setMentees(mentees.filter((mentee) => mentee._id !== menteeId)); // Remove mentee from the list after unassign
      }
    } catch (error) {
      console.error("Error removing mentee:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar role="mentor" />
      <div className="flex-grow p-6">
        <h1 className="text-xl font-bold">Your Mentees</h1>
        {loading ? (
          <p>Loading mentees...</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentees.length > 0 ? (
              mentees.map((mentee) => (
                <div key={mentee._id} className="bg-white p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold">{mentee.name}</h2>
                  <p className="text-gray-600">{mentee.email}</p>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => handleRemoveMentee(mentee._id)} // Pass mentee._id here
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No mentees found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default YourMentee;