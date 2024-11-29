import express from 'express';
import { createAchievement, getAchievements } from '../controllers/achievementController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create an achievement (protected)
router.post('/', authMiddleware, createAchievement);

// Get achievements (protected)
router.get('/', authMiddleware, getAchievements);

export default router;
