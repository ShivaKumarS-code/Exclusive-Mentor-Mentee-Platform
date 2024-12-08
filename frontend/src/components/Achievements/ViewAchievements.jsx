import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { viewSelfAchievements, viewMenteesAchievements } from "../../api/achievementApi"; // Import the correct API functions

const ViewAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      setError(null);

      try {
        let data;
        if (userRole === "mentee") {
          data = await viewSelfAchievements(); // Fetch mentee's own achievements
        } else {
          data = await viewMenteesAchievements(); // Fetch assigned mentees' achievements for mentors
        }
        setAchievements(data);
      } catch (err) {
        setError(err.message || "Failed to fetch achievements");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [userRole]);

  const handleBack = () => {
    if (userRole === "mentee") {
      navigate("/mentee/achievements");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-md h-screen overflow-hidden flex flex-col">
      <div className="p-4 border-b bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          {userRole === "mentee" ? "Your Achievements" : "Mentees' Achievements"}
        </h1>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-center text-red-500">Error: {error}</div>}
        {achievements.length > 0 ? (
          achievements.map((achievement) => (
            <div
              key={achievement._id} // Use the unique _id field for the key
              className="p-4 border rounded-md shadow-sm bg-gray-100 hover:bg-gray-200 transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                Mentee Name: {achievement.mentee?.username || "Anonymous"} {/* Display mentee's name */}
              </h3>
              <p className="text-gray-700 mt-2">Achievement: {achievement.achievementText}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No achievements to display.</p>
        )}
      </div>

      {userRole === "mentee" && (
        <div className="p-4 border-t bg-gray-50 text-center">
          <button
            onClick={handleBack}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewAchievements;
