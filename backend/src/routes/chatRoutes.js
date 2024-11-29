import express from 'express';
import { sendMessage, getMessages } from '../controllers/chatController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Send a message (protected)
router.post('/', authMiddleware, sendMessage);

// Get messages between users (protected)
router.get('/', authMiddleware, getMessages);

export default router;
