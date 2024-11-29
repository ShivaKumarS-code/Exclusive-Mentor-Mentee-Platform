import Message from '../models/Message.js';

// Send a message
export const sendMessage = async (req, res) => {
  const { receiver, message } = req.body;

  try {
    const newMessage = new Message({ sender: req.user.id, receiver, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
};

// Get messages between users
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: req.query.receiver },
        { receiver: req.user.id, sender: req.query.receiver },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
};
