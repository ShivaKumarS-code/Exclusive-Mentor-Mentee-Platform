import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ViewAchievements = () => {
  const [achievements, setAchievements] = useState([]); // State to store achievements
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const location = useLocation();
  const userRole = localStorage.getItem("userRole"); // Assume role is stored in localStorage

  useEffect(() => {
    // Replace with your API endpoint
    const fetchAchievements = async () => {
      try {
        const response = await fetch("/api/achievements"); // Replace with actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch achievements");
        }
        const data = await response.json();
        setAchievements(data); // Set the fetched achievements
      } catch (err) {
        setError(err.message); // Set error if the fetch fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchAchievements(); // Call the fetch function
  }, []);

  return (
    <div className="p-6 bg-gray-100 h-screen">
      {/* Default heading for Mentees Achievements */}
      <h1 className="text-2xl font-bold text-center mb-6">Mentees Achievements</h1>

      <div className="space-y-4 max-w-2xl mx-auto">
        {loading && <div>Loading...</div>} {/* Show loading text while fetching data */}
        
        {error && <div>Error: {error}</div>} {/* Show error message if fetching fails */}

        {achievements.length > 0 ? (
          achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-800">{achievement.menteeName}</h3>
              <p className="text-gray-700 mt-2">{achievement.text}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No achievements to display.</p>
        )}

        {/* Conditionally render the "Add More Achievements" button for mentees only */}
        {userRole === "mentee" && (
          <button
            onClick={() => Navigate("/mentee/achievements")}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 mt-4"
          >
            Add More Achievements
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewAchievements;
