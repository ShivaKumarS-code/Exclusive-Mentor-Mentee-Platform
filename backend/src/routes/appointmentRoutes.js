import express from 'express';
import { createAppointment, getAppointments } from '../controllers/appointmentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create an appointment (protected)
router.post('/', authMiddleware, createAppointment);

// Get all appointments (protected)
router.get('/', authMiddleware, getAppointments);

export default router;
