import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/appLogo.svg";
import logout from "../assets/images/logout.png";
import {
  FaClipboardList,
  FaTrophy,
  FaUserAlt,
  FaChalkboardTeacher,
  FaSignOutAlt,
  FaUsers,
  FaHome,
} from "react-icons/fa";

const Sidebar = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="w-64 text-white bg-zinc-800 h-screen flex flex-col">
      <div
        className={`p-6 sticky top-0 bg-zinc-800 z-10 ${
          role === "mentor" ? "mb-[20px]" : "mb-[50px]"
        }`}
      >
        <img src={logo} className="absolute w-[80px] top-[12px] left-0" />
        <h2 className="text-[40px] font-bold text-right font1 text-purple-400">
          MENTOR LINK
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div
          className="p-6"
          style={{ "::-webkit-scrollbar": { display: "none" } }}
        >
          <ul className={`flex flex-col ${role === "mentor" ? "gap-[35px]" : "gap-[45px]"}`}>
            <li>
              <Link
                to={`/${role}/dashboard`}
                className="flex items-center text-white space-x-4 p-2 rounded-lg group"
              >
                <FaHome className="text-xl text-pink-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                <span className="transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 group-hover:tracking-wider">
                  Dashboard
                </span>
              </Link>
            </li>

            {role === "mentor" && (
              <li>
                <Link
                  to="/mentor/selectMentee"
                  className="flex items-center space-x-4 p-2 rounded-lg group"
                >
                  <FaUsers className="text-xl text-pink-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:text-green-400" />
                  <span className="transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-blue-500 group-hover:tracking-wider">
                    Select Mentee
                  </span>
                </Link>
              </li>
            )}

            {role === "mentor" && (
              <li>
                <Link
                  to="/mentor/yourMentee"
                  className="flex items-center space-x-4 p-2 rounded-lg group"
                >
                  <FaChalkboardTeacher className="text-xl text-pink-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:text-yellow-400" />
                  <span className="transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-red-500 group-hover:tracking-wider">
                    Your Mentee
                  </span>
                </Link>
              </li>
            )}

            <li>
              <Link
                to={`/${role}/appointments`}
                className="flex items-center text-white space-x-4 p-2 rounded-lg group"
              >
                <FaClipboardList className="text-xl text-pink-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:text-blue-400" />
                <span className="transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-indigo-500 group-hover:tracking-wider">
                  Appointments
                </span>
              </Link>
            </li>

            <li>
              <Link
                to={`/${role}/achievements`}
                className="flex items-center space-x-4 p-2 rounded-lg group"
              >
                <FaTrophy className="text-xl text-pink-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:text-pink-400" />
                <span className="transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-600 group-hover:tracking-wider">
                  Achievements
                </span>
              </Link>
            </li>

            <li>
              <Link
                to={`/${role}/feedback`}
                className="flex items-center space-x-4 p-2 rounded-lg group"
              >
                <FaUserAlt className="text-xl text-pink-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:text-teal-400" />
                <span className="transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-purple-400 group-hover:tracking-wider">
                  Feedback
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-6 sticky bottom-0 bg-zinc-800">
        <button
          onClick={handleLogout}
          className="w-full h-[50px] flex items-center relative justify-center space-x-4 bg-blue-900 text-white py-2 rounded-lg group transition-transform duration-300 hover:scale-105"
        >
          <img src={logout} className="w-[90px] left-0 bottom-[-10px] absolute" />
          <FaSignOutAlt className="text-xl absolute left-[65px] transition-transform duration-300 group-hover:scale-110 group-hover:bg-clip-text group-hover:rotate-6" />
          <span className="transition-all duration-300 absolute left-[90px] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-red-500 group-hover:tracking-wider">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

