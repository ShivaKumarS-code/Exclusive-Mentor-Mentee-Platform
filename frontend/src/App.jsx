import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import MentorDashboard from "./pages/mentor/MentorDashboard";
import MenteeDashboard from "./pages/mentee/MenteeDashboard";
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute component

const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route 
          path="/mentor/dashboard" 
          element={
            <PrivateRoute role="mentor">
              <MentorDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/mentee/dashboard" 
          element={
            <PrivateRoute role="mentee">
              <MenteeDashboard />
            </PrivateRoute>
          } 
        />

        {/* Default Route */}
        <Route path="*" element={<div className="text-center mt-10">HARE KRISHNA (frontend)</div>} />
      </Routes>
    </div>
  );
};

export default App;
