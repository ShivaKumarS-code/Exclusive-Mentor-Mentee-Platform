import Achievement from '../models/Achievement.js';
import User from '../models/User.js';

// Controller to upload achievement as a mentee
export const uploadAchievement = async (req, res) => {
  const { achievementText } = req.body;

  if (req.user.role !== 'mentee') {
    return res.status(403).json({ message: 'Only mentees can upload achievements' });
  }

  try {
    const newAchievement = await Achievement.create({
      mentee: req.user.id,
      achievementText,
    });

    res.status(201).json({ message: 'Achievement uploaded successfully', achievement: newAchievement });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload achievement', error: error.message });
  }
};

// Controller to view self achievements as a mentee
export const viewSelfAchievements = async (req, res) => {
  if (req.user.role !== 'mentee') {
    return res.status(403).json({ message: 'Only mentees can view their own achievements' });
  }

  try {
    const achievements = await Achievement.find({ mentee: req.user.id })
      .sort({ createdAt: -1 })
      .populate('mentee', 'username'); // Populate mentee's username

    res.status(200).json({ achievements });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch achievements', error: error.message });
  }
};

// Controller to view achievements of assigned mentees as a mentor
export const viewMenteesAchievements = async (req, res) => {
  if (req.user.role !== 'mentor') {
    return res.status(403).json({ message: 'Only mentors can view mentees achievements' });
  }

  try {
    const mentor = await User.findById(req.user.id).populate('assignedMentees');

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    const menteeIds = mentor.assignedMentees.map((mentee) => mentee._id);

    // Fetch achievements for assigned mentees and populate mentee's username
    const achievements = await Achievement.find({ mentee: { $in: menteeIds } })
      .sort({ createdAt: -1 })
      .populate('mentee', 'username'); // Populate mentee's username

    res.status(200).json({ achievements });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch mentees achievements', error: error.message });
  }
};
