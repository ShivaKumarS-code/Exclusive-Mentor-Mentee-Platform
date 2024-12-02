import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { fetchUnselectedMentees, addMentee } from "../../api/selectMenteeApi";

const SelectMentee = () => {
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch unselected mentees
  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const unselectedMentees = await fetchUnselectedMentees();
        // Assuming the response contains an object with a "mentees" array
        setMentees(unselectedMentees); 
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch unselected mentees");
        setLoading(false);
      }
    };

    fetchMentees();
  }, []);

  // Function to add mentee to the mentor
  const handleSelectMentee = async (menteeId) => {
    try {
      const mentorId = "mentorId"; // Get the mentorId, probably from context or route params
      const response = await addMentee(mentorId, menteeId);
      if (response) {
        // Use the functional form of setState to avoid stale state issues
        setMentees((prevMentees) =>
          prevMentees.filter((mentee) => mentee._id !== menteeId)
        ); // Remove selected mentee from the list
      }
    } catch (err) {
      setError("Failed to select mentee");
    }
  };

  return (
    <div className="flex">
      <Sidebar role="mentor" />
      <div className="flex-grow p-6">
        <h1 className="text-xl font-bold">Select</h1>
        {loading ? (
          <div>Loading mentees...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentees.map((mentee) => (
              <div
                key={mentee._id}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">{mentee.username}</h2>
                  <p className="text-gray-500">{mentee.email}</p>
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleSelectMentee(mentee._id)}
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectMentee;
