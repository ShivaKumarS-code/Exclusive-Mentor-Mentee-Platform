import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  mentee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Achievement = mongoose.model('Achievement', achievementSchema);

export default Achievement;
