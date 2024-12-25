import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import s1 from "../../assets/images/s1.jpeg";
import s2 from "../../assets/images/s2.jpeg";
import s3 from "../../assets/images/s3.jpeg";
import s4 from "../../assets/images/s4.webp";
import Animation1 from "../animations/Animation1";

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
        setTimeout(() => navigate("/login"), 1000); // Redirect after 1 second
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Carousel functionality
  const images = [s1, s2, s3, s4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-zinc-700 text-white flex flex-col items-center justify-center">
      <div className="w-[900px] border-2 bg-zinc-800 border-purple-500 h-full relative overflow-hidden flex flex-col rounded-3xl">
        <form
          className="ml-[30px] border-none p-6 rounded w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <div className="translate-x-[-50%]">
            <Animation1 />
          </div>

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
              className="block text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 bg-zinc-700 text-white py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#ff01ea]"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-zinc-700 text-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#ff01ea]"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff01ea]"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-white"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg px-3 bg-zinc-700 text-white py-2 border focus:outline-none focus:ring-2 focus:ring-[#ff01ea]"
            >
              <option value="mentee">Mentee</option>
              <option value="mentor">Mentor</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-2xl bg-purple-500 hover:text-white py-2 text-black hover:bg-purple-600 transition duration-200 focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="absolute w-[450px] flex justify-center items-center h-full right-0">
          <div className="w-[400px] rounded-3xl h-[400px] overflow-hidden relative">
            <div
              className="flex w-full h-full transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Slide ${index}`}
                  className="w-[400px] h-[400px] object-cover"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Link to Login Page */}
        <p className="mt-6 z-10 mb-[20px] text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-red-500 hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
