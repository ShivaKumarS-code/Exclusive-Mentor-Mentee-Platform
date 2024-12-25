import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadAchievement } from "../../api/achievementApi"; // Import the correct API function

const AddAchievement = () => {
  const [achievementInput, setAchievementInput] = useState(""); // Input field value
  const [file, setFile] = useState(null); // File input value
  const [loading, setLoading] = useState(false); // Loading state for API call
  const [error, setError] = useState(null); // Error state for API call
  const navigate = useNavigate();

  // Add a new achievement using the API
  const handleAddAchievement = async () => {
    if (achievementInput.trim() === "") return; // Prevent empty submissions
    setLoading(true);
    setError(null);

    try {
      await uploadAchievement(achievementInput, file); // Call the API function for adding achievement
      setAchievementInput(""); // Clear the input field
      setFile(null); // Clear the file input
      alert("Achievement added successfully!");
    } catch (err) {
      setError(err.message || "Failed to add achievement");
    } finally {
      setLoading(false);
    }
  };

  const handleViewAchievements = () => {
    navigate("/mentee/view-achievements");
  };

  return (
    <div className="p-6 translate-y-[50px] translate-x-1/2 rounded-3xl border-2 border-yellow-500 bg-zinc-800 w-[600px]">
      <h1 className="text-2xl font-bold text-center mb-4">Add Achievement</h1>
      <div className="max-w-lg mx-auto">
        {/* Input Section */}
        <textarea
          value={achievementInput}
          onChange={(e) => setAchievementInput(e.target.value)}
          placeholder="Write your achievement..."
          className="w-full p-3 border bg-zinc-600 border-purple-500 rounded-md mb-4 focus:outline-none "
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-3 border border-purple-500 rounded-md mb-4 focus:outline-none"
        />
        <button
          onClick={handleAddAchievement}
          className="w-full bg-yellow-500 text-black hover:text-white py-2 px-4 rounded-xl hover:bg-yellow-600 transition duration-200 mb-4"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Achievement"}
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {/* View Achievements Button */}
        <button
          onClick={handleViewAchievements}
          className="w-full bg-purple-700 text-black hover:text-white py-2 px-4 rounded-xl hover:bg-purple-800 transition duration-200"
        >
          View Achievements
        </button>
      </div>
    </div>
  );
};

export default AddAchievement;