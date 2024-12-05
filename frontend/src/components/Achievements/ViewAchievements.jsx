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
    <div className="p-6 bg-gray-100 min-h-screen">
      {userRole === "mentee" && (
        <button
          onClick={handleBack}
          className="mb-6 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Back
        </button>
      )}
      <h1 className="text-2xl font-bold text-center mb-6">
        {userRole === "mentee" ? "Your Achievements" : "Mentees' Achievements"}
      </h1>
      <div className="space-y-4 max-w-2xl mx-auto">
        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-center text-red-500">Error: {error}</div>}
        {achievements.length > 0 ? (
          achievements.map((achievement) => (
            <div
              key={achievement._id} // Use the unique _id field for the key
              className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                Mentee Name: {achievement.mentee?.username || "Anonymous"} {/* Display mentee's name */}
              </h3>
              <p className="text-gray-700 mt-2">Achievement: {achievement.achievementText}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No achievements to display.</p>
        )}
      </div>
    </div>
  );
};

export default ViewAchievements;
