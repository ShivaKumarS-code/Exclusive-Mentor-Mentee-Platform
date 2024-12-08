import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaTrophy,
  FaUserAlt,
  FaChalkboardTeacher,
  FaSignOutAlt,
  FaUsers,
  FaHome, // Icon for the Dashboard
} from "react-icons/fa";

const Sidebar = ({ role }) => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    // Clear user authentication data (e.g., JWT token from localStorage or sessionStorage)
    localStorage.removeItem("accessToken");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-center mb-8">Hello {role}</h2>
        <ul>
          {/* Dashboard link */}
          <li className="mb-6">
            <Link
              to={`/${role}/dashboard`}
              className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-lg transition duration-200"
            >
              <FaHome className="text-xl" />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* "Select Mentee" link for mentors only */}
          {role === "mentor" && (
            <li className="mb-6">
              <Link
                to="/mentor/selectMentee"
                className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-lg transition duration-200"
              >
                <FaUsers className="text-xl" />
                <span>Select Mentee</span>
              </Link>
            </li>
          )}

          {/* "Your Mentee" link for mentors only */}
          {role === "mentor" && (
            <li className="mb-6">
              <Link
                to="/mentor/yourMentee"
                className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-lg transition duration-200"
              >
                <FaChalkboardTeacher className="text-xl" />
                <span>Your Mentee</span>
              </Link>
            </li>
          )}

          {/* Appointments */}
          <li className="mb-6">
            <Link
              to={`/${role}/appointments`}
              className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-lg transition duration-200"
            >
              <FaClipboardList className="text-xl" />
              <span>Appointments</span>
            </Link>
          </li>

          {/* Achievements */}
          <li className="mb-6">
            <Link
              to={`/${role}/achievements`}
              className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-lg transition duration-200"
            >
              <FaTrophy className="text-xl" />
              <span>Achievements</span>
            </Link>
          </li>

          {/* Feedback */}
          <li className="mb-6">
            <Link
              to={`/${role}/feedback`}
              className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-lg transition duration-200"
            >
              <FaUserAlt className="text-xl" />
              <span>Feedback</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout button at the bottom of the sidebar */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center space-x-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200"
      >
        <FaSignOutAlt className="text-xl" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
