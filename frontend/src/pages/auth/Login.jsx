import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>

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
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
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
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
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
                userRole === "mentee" ? "bg-blue-500 text-white" : "bg-gray-200"
              } rounded hover:bg-gray-300`}
            >
              Mentee
            </button>
            <button
              type="button"
              onClick={() => setUserRole("mentor")}
              className={`px-3 py-1 ml-2 ${
                userRole === "mentor" ? "bg-blue-500 text-white" : "bg-gray-200"
              } rounded hover:bg-gray-300`}
            >
              Mentor
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Link to Register Page */}
      <p className="mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
