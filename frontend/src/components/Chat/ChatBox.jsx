import React, { useState, useRef, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

const ChatBox = ({ role, onBack, onSaveChat, onViewChat }) => {
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
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Header */}
      <div className="p-4 bg-blue-600 text-white flex items-center justify-between">
        <div className="flex items-center">
          {onBack && (
            <button onClick={onBack} className="mr-4">
              <FaArrowLeft className="text-2xl" />
            </button>
          )}
          <h1 className="text-lg font-semibold">{role} Chat</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onSaveChat}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
          >
            Save Chat
          </button>
          <button
            onClick={onViewChat}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
          >
            View Chat
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${
              message.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-xl shadow-md p-3 max-w-xs text-sm ${
                message.sender === "me"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
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
      <div className="p-4 bg-white border-t border-gray-300 flex items-center">
        <BsEmojiSmile className="text-2xl text-gray-500 mr-3 cursor-pointer" />
        <textarea
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message"
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 resize-none overflow-hidden"
          rows="1"
        />
        <button
          onClick={handleSendMessage}
          className="ml-4 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition duration-200"
        >
          <IoSend className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
