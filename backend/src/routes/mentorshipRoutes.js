import express from "express";
import {
  getUnassignedMentees,
  selectMenteeForMentor,
  unselectMenteeForMentor,
} from "../controllers/mentorshipController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Fetch available (unassigned) mentees for a mentor
router.get("/available-mentees", authMiddleware, getUnassignedMentees);

// Select a mentee for a mentor
router.post("/select", authMiddleware, selectMenteeForMentor);

// Unselect a mentee for a mentor
router.post("/unselect", authMiddleware, unselectMenteeForMentor);

export default router;
