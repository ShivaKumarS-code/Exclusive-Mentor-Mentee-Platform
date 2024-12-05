import React from "react";
import Sidebar from "../../components/Sidebar";
import ChatBox from "../../components/Chat/ChatBox";

const MenteeChat = () => {
  return (
    <div className="flex">
      <Sidebar role="mentee" />
      <div className="flex-grow">
        {/* Render ChatBox component */}
        <ChatBox role="mentee" />
      </div>
    </div>
  );
};

export default MenteeChat;
