import Feedback from '../models/Feedback.js';

// Give feedback
export const giveFeedback = async (req, res) => {
  const { receiver, feedback, rating } = req.body;
  
  try {
    const newFeedback = new Feedback({ giver: req.user.id, receiver, feedback, rating });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Error giving feedback' });
  }
};

// Get feedback for a user
export const getFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ receiver: req.user.id });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback' });
  }
};
