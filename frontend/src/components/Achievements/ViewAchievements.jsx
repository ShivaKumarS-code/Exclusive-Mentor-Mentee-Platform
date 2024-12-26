import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { viewSelfAchievements, viewMenteesAchievements, downloadFile } from "../../api/achievementApi"; // Import the correct API functions

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

  const handleDownloadFile = async (fileId) => {
    try {
      const fileBlob = await downloadFile(fileId);
      const url = window.URL.createObjectURL(fileBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `file-${fileId}`; // You can customize the filename
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || "Failed to download file");
    }
  };

  return (
    <div className="bg-black text-white shadow-lg rounded-md h-screen overflow-hidden flex flex-col">
      <div className="p-4 border-b bg-black">
        <h1 className="text-[35px] font2 font-bold text-center">
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
              className="p-4 border border-yellow-500 rounded-3xl shadow-sm bg-zinc-800 hover:bg-zinc-900 transition"
            >
              <h3 className="text-lg font-semibold text-white">
                Mentee Name: {achievement.mentee?.username || "Anonymous"} {/* Display mentee's name */}
              </h3>
              <p className="text-white mt-2">Achievement: {achievement.achievementText}</p>
              {achievement.fileData && (
                <div className="mt-2">
                  <button
                    onClick={() => handleDownloadFile(achievement._id)}
                    className="text-blue-500 hover:underline"
                  >
                    Download Attached File
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-purple-500">No achievements to display.</p>
        )}
      </div>

      {userRole === "mentee" && (
        <div className="p-4 border-t bg-black text-center">
          <button
            onClick={handleBack}
            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewAchievements; 

