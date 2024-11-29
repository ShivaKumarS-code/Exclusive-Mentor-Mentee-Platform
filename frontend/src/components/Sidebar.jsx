import React from "react";
import { Link } from "react-router-dom";
import { FaClipboardList, FaComments, FaTrophy, FaUserAlt, FaChalkboardTeacher } from "react-icons/fa";

const Sidebar = ({ role }) => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-6">
      <h2 className="text-2xl font-bold text-center mb-8">Mentor-Mentee Dashboard</h2>
      <ul>
        <li className="mb-6">
          <Link 
            to={`/${role}/appointments`} 
            className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-lg transition duration-200"
          >
            <FaClipboardList className="text-xl" />
            <span>Appointments</span>
          </Link>
        </li>

        <li className="mb-6">
          <Link 
            to={`/${role}/chat`} 
            className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-lg transition duration-200"
          >
            <FaComments className="text-xl" />
            <span>Chat</span>
          </Link>
        </li>

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

        <li className="mb-6">
          <Link 
            to={`/${role}/achievements`} 
            className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-lg transition duration-200"
          >
            <FaTrophy className="text-xl" />
            <span>Achievements</span>
          </Link>
        </li>

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
  );
};

export default Sidebar;
