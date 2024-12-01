import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddAchievement = () => {
  const [achievements, setAchievements] = useState([]); // List of achievements
  const [achievementInput, setAchievementInput] = useState(""); // Input field value
  const [editMode, setEditMode] = useState(false); // Track if we are editing an achievement
  const [currentEditId, setCurrentEditId] = useState(null); // Track which achievement is being edited
  const navigate = useNavigate();

  // Add a new achievement or update an existing one
  const handleAddOrUpdateAchievement = () => {
    if (achievementInput.trim() === "") return; // Prevent empty submissions

    if (editMode) {
      // Update the existing achievement
      setAchievements((prevAchievements) =>
        prevAchievements.map((achievement) =>
          achievement.id === currentEditId
            ? { ...achievement, text: achievementInput } // Modify the achievement text
            : achievement
        )
      );
      setEditMode(false); // Exit edit mode
      setCurrentEditId(null); // Clear the ID
    } else {
      // Add the new achievement
      setAchievements([
        ...achievements,
        {
          id: Date.now(), // Unique ID for each achievement
          text: achievementInput,
        },
      ]);
    }

    setAchievementInput(""); // Clear the input field
  };

  // Start editing an achievement
  const handleEditAchievement = (id, text) => {
    setEditMode(true); // Enable edit mode
    setCurrentEditId(id); // Set the ID of the achievement to be edited
    setAchievementInput(text); // Set the input field to the current achievement text
  };

  // Delete an achievement
  const handleDeleteAchievement = (id) => {
    setAchievements(achievements.filter((achievement) => achievement.id !== id));
  };

  const handleViewAchievements = () => {
    // Navigate to ViewAchievements and pass achievements as state
    navigate("/mentee/viewAchievements", { state: { achievements } });
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-4">Add Achievement</h1>
      <div className="max-w-lg mx-auto">
        {/* Input Section */}
        <textarea
          value={achievementInput}
          onChange={(e) => setAchievementInput(e.target.value)}
          placeholder="Write your achievement..."
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleAddOrUpdateAchievement}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 mb-4"
        >
          {editMode ? "Update Achievement" : "Submit Achievement"}
        </button>

      </div>
    </div>
  );
};

export default AddAchievement;
