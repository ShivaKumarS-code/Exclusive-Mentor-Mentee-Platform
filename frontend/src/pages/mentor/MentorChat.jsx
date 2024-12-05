import React from "react";
import Sidebar from "../../components/Sidebar";
import ChatBox from "../../components/Chat/ChatBox"; // Import the ChatBox component

const MentorChat = () => {
  return (
    <div className="flex">
      <Sidebar role="mentor" />
      <div className="flex-grow">
        {/* Render ChatBox component */}
        <ChatBox role="mentor" />
      </div>
    </div>
  );
};

export default MentorChat;
