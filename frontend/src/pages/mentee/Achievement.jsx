import React from "react";
import Sidebar from "../../components/Sidebar"; // Adjust path as per your file structure
import AddAchievement from "../../components/Achievements/AddAchievement"; // Import AddAchievement component

const Achievement = () => {
  return (
    <div className="flex">
      <Sidebar role="mentee" /> {/* Pass role as needed */}
      <div className="flex-grow p-6 text-white bg-black border-l-4 border-purple-700 rounded-l-[50px]">
        <h1 className="text-[30px] translate-y-[20px] font2 font-bold mb-4">Achievements</h1>
        
        {/* Add Achievement Component */}
        <AddAchievement />

      </div>
    </div>
  );
};

export default Achievement;
