import React from "react";
import Sidebar from "../../components/Sidebar";
import Appointment from "../../components/Appointments/Appointment"; // Import the Appointment component

const MentorAppointment = () => {
  return (
    <div className="flex">
      <Sidebar role="mentor" />
      <div className="flex-grow p-6">
        <h1 className="text-xl font-bold">Mentor Appointments</h1>
        <div>
          <Appointment /> {/* Include the Appointment component here */}
        </div>
      </div>
    </div>
  );
};

export default MentorAppointment;
