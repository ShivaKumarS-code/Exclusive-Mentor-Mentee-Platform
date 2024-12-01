import React, { useState, useRef, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Optional: To provide a back button or navigation
import { BsEmojiSmile } from "react-icons/bs"; // Optional: Add emoji icon
import { IoSend } from "react-icons/io5"; // New import for the send button icon

const ChatBox = ({ role }) => {
  const [messages, setMessages] = useState([]); // Stores the chat messages
  const [messageInput, setMessageInput] = useState(""); // Stores the current input value
  const messagesEndRef = useRef(null); // Reference to scroll to the bottom of the chat

  // Scroll to the bottom whenever a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (messageInput.trim() === "") return; // Prevent sending empty messages

    setMessages([...messages, { id: Date.now(), text: messageInput, sender: "me" }]); // Add new message
    setMessageInput(""); // Clear input field
  };

  return (
    <div className="flex justify-center p-4"> {/* Added center alignment */}
      {/* Main Chat Area */}
      <div className="w-full max-w-xl bg-gray-50 p-4 flex flex-col rounded-lg shadow-lg h-full"> {/* Adjusted width, added full height */}
        
        {/* Chat Header */}
        <div className="p-4 bg-blue-500 text-white font-bold text-lg flex items-center justify-between">
          <span>Chat</span>
          <BsEmojiSmile className="text-white text-2xl" />
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 mb-2 flex flex-col gap-4"> {/* Flex for message alignment */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`bg-blue-500 text-white p-4 rounded-lg shadow-md max-w-xs ${
                  message.sender === "me" ? "ml-2" : "mr-2"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {/* Dummy element to scroll to the bottom */}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white flex items-center border-t border-gray-300 mt-auto"> {/* mt-auto aligns the input to the bottom */}
          <textarea
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 resize-none overflow-hidden"
            rows="2"
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition duration-200"
          >
            {/* Send Icon (Changed symbol) */}
            <IoSend className="text-white text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
