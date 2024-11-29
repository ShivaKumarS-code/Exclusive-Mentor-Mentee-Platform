import Achievement from '../models/Achievement.js';

// Create a new achievement
export const createAchievement = async (req, res) => {
  const { mentee, title, description } = req.body;

  try {
    const newAchievement = new Achievement({ mentee, title, description });
    await newAchievement.save();
    res.status(201).json(newAchievement);
  } catch (error) {
    res.status(500).json({ message: 'Error creating achievement' });
  }
};

// Get achievements for a mentee
export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({ mentee: req.user.id });
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching achievements' });
  }
};
