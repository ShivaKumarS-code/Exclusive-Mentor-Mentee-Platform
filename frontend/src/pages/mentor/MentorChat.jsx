import React from "react";
import Sidebar from "../../components/Sidebar";
import ChatBox from "../../components/Chat/ChatBox"; // Import the ChatBox component

const MentorChat = () => {
  return (
    <div className="flex">
      <Sidebar role="mentor" />
      <div className="flex-grow p-6">
        <h1 className="text-xl font-bold mb-4">Mentor Chat</h1>
        {/* Render ChatBox component */}
        <ChatBox role="mentor" />
      </div>
    </div>
  );
};

export default MentorChat;
