import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from '../../../public/images/r4.png';
import leaf1 from '../../../public/images/leaf_01.png';
import leaf2 from '../../../public/images/leaf_02.png';
import leaf3 from '../../../public/images/leaf_03.png';
import leaf4 from '../../../public/images/leaf_04.png';
import { easeInOut, motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [userRole, setUserRole] = useState("mentee"); // Default role
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const navigate = useNavigate();

  // API Base URL (use environment variable or default to localhost)
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Include the role in the request
    const payload = { ...formData, role: userRole };

    try {
      setIsLoading(true); // Start loading
      const response = await axios.post(`${API_BASE_URL}/auth/login`, payload);

      const { accessToken, refreshToken, role } = response.data;

      if (role !== userRole) {
        // Show error if roles don't match
        setMessage(`Invalid role. You are logged in as ${role}`);
        return;
      }

      // Save tokens and role to localStorage (or a state management solution)
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", role);

      // Redirect based on role
      if (role === "mentor") {
        navigate("/mentor/dashboard");
      } else if (role === "mentee") {
        navigate("/mentee/dashboard");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="leaves">
        <div className="set">
           <div><img src={leaf1} /></div>
           <div><img src={leaf2} /></div>
           <div><img src={leaf3} /></div>
           <div><img src={leaf4} /></div>
           <div><img src={leaf1} /></div>
           <div><img src={leaf2} /></div>
           <div><img src={leaf3} /></div>
           <div><img src={leaf4} /></div>
         </div>
      </div>
    <div className="w-[900px] border-2 border-zinc-800 h-full relative overflow-hidden flex flex-col rounded-3xl" id="loginBg">
      <form
        className=" ml-[30px] p-6 rounded w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-[40px] font1 text-[#FFAB02] text-center font-bold mb-[15px]">Login</h1>

        {/* Show error/success message */}
        {message && (
          <p
            className={`mb-4 ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-3 mb-[15px] bg-zinc-700 text-white py-2 border rounded-lg focus:ring focus:ring-[#AAFF01]"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-3 py-2 border mb-[15px] bg-zinc-700 text-white rounded-lg focus:ring focus:ring-[#AAFF01]"
            required
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span>Role:</span>
          <div>
            <button
              type="button"
              onClick={() => setUserRole("mentee")}
              className={`px-3 py-1 ${
                userRole === "mentee" ? "bg-[#AAFF01] text-black" : "bg-gray-200 text-zinc-500"
              } rounded-full`}
            >
              Mentee
            </button>
            <button
              type="button"
              onClick={() => setUserRole("mentor")}
              className={`px-3 py-1 ml-2 ${
                userRole === "mentor" ? "bg-[#01ff12] text-black" : "bg-gray-200 text-zinc-500"
              } rounded-full`}
            >
              Mentor
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-[15px] bg-yellow-500 text-black hover:text-white py-2 rounded-2xl hover:bg-yellow-600 disabled:opacity-50"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="absolute w-[450px] flex justify-center items-center h-full right-0">
      <motion.img
                  src={logo}
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: 1,
                    repeat: Infinity,
                    ease: easeInOut,
                    repeatType: 'reverse',
                  }}
                  
                />
      </div>

      {/* Link to Register Page */}
      <p className="mt-4 z-10 text-center mb-[30px]">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:text-[#AAFF01] hover:underline">
          Register here
        </Link>
      </p>
    </div>
  </div>
  );
};

export default Login;
