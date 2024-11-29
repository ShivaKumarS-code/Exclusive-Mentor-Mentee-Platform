import React, { useState, useEffect } from 'react';
import { getMessages, sendMessage } from '../../utils/api'; // Same API logic for mentee

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [mentorId, setMentorId] = useState(''); // Assuming we know the mentor's ID

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getMessages('mentee', mentorId); // Fetch messages with the mentor
      setMessages(data);
    };
    fetchMessages();
  }, [mentorId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendMessage('mentee', mentorId, newMessage); // Send message to the mentor
      setNewMessage('');
      // Refetch messages after sending
      const data = await getMessages('mentee', mentorId);
      setMessages(data);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Chat with Mentor</h2>
      <div className="mt-4">
        <div className="border border-gray-300 rounded-lg p-4 h-80 overflow-y-auto">
          {messages.map((message) => (
            <div key={message._id} className={`mb-4 p-2 ${message.sender === 'mentee' ? 'bg-green-200' : 'bg-blue-200'} rounded-lg`}>
              <p>{message.text}</p>
              <small className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</small>
            </div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-3/4"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
