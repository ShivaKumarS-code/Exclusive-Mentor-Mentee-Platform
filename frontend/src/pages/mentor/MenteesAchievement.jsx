import React from "react";
import Sidebar from "../../components/Sidebar"; // Adjust path as per your file structure
import ViewAchievements from "../../components/Achievements/ViewAchievements"; // Import the ViewAchievements component

const MenteesAchievement = () => {
  return (
    <div className="flex">
      <Sidebar role="mentor" /> {/* Pass role as needed */}
      <div className="flex-1 p-6">
        {/* Render the ViewAchievements component here */}
        <ViewAchievements />
      </div>
    </div>
  );
};

export default MenteesAchievement;
