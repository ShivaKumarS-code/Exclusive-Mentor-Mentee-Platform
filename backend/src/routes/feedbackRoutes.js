import express from 'express';
import { giveFeedback, getFeedback } from '../controllers/feedbackController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Give feedback (protected)
router.post('/', authMiddleware, giveFeedback);

// Get feedback (protected)
router.get('/', authMiddleware, getFeedback);

export default router;
