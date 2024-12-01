import React from "react";
import Sidebar from "../../components/Sidebar";
import ChatBox from "../../components/Chat/ChatBox";

const MenteeChat = () => {
  return (
    <div className="flex">
      <Sidebar role="mentee" />
      <div className="flex-grow p-6">
        <h1 className="text-xl font-bold mb-4">Mentee Chat</h1>
        {/* Render ChatBox component */}
        <ChatBox role="mentee" />
      </div>
    </div>
  );
};

export default MenteeChat;
