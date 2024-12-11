import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/r1.png';
import leaf1 from '../../assets/images/leaf_01.png';
import leaf2 from '../../assets/images/leaf_02.png';
import leaf3 from '../../assets/images/leaf_03.png';
import leaf4 from '../../assets/images/leaf_04.png';
import { easeInOut, motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "mentee", // Default to mentee
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/auth/register", formData);
      setMessage(response.data.message);

      // Redirect to login page if registration is successful
      if (response.data.success) {
        setTimeout(() => navigate("/login"), 1008); // Redirect after 1 seconds
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return ( 
    <div className="min-h-screen flex flex-col items-center justify-center ">
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
        className=" ml-[30px] border-none p-6 rounded w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="font1 text-[40px] font-bold mb-2 text-center text-[#FFAB02]">
          REGISTER
        </h1>

        {/* Success/Error Message */}
        {message && (
          <p
            className={`mb-4 text-center ${
              message.toLowerCase().includes("success")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Username Field */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 bg-zinc-700 text-white py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#AAFF01]"
            placeholder="Enter your username"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-zinc-700 text-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#AAFF01]"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AAFF01]"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Role Selection */}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-lg px-3 bg-zinc-700 text-white py-2 border focus:outline-none focus:ring-2 focus:ring-[#AAFF01]"
          >
            <option value="mentee">Mentee</option>
            <option value="mentor">Mentor</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-2xl bg-yellow-500 hover:text-white py-2 text-black hover:bg-yellow-600 transition duration-200 focus:outline-none"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
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

      {/* Link to Login Page */}
      <p className="mt-6 z-10 mb-[20px] text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:text-[#AAFF01] hover:underline">
          Login here
        </Link>
      </p>
     </div>
    </div>
  );
};

export default Register;
