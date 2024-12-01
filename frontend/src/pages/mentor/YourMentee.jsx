import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";

const YourMentee = () => {
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch mentees list
  useEffect(() => {
    const fetchMentees = async () => {
      try {
        // Assuming your API endpoint is '/api/mentees' (this should be updated with your actual endpoint)
        const response = await fetch("/api/mentees");
        const data = await response.json();
        setMentees(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching mentees:", error);
        setLoading(false);
      }
    };

    fetchMentees();
  }, []);

  // Remove mentee from list (and also remove from backend)
  const handleRemoveMentee = async (menteeId) => {
    try {
      // Assuming your API endpoint for removing mentee is '/api/mentees/remove/:id'
      const response = await fetch(`/api/mentees/remove/${menteeId}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        // Remove mentee from state list after deletion
        setMentees(mentees.filter((mentee) => mentee.id !== menteeId));
      } else {
        console.error("Failed to remove mentee");
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
                <div key={mentee.id} className="bg-white p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold">{mentee.name}</h2>
                  <p className="text-gray-600">{mentee.email}</p>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => handleRemoveMentee(mentee.id)}
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
