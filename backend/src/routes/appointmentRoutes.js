// src/routes/mentorshipRoutes.js

import express from "express";
import { getUnassignedMentees, assignMenteeToMentor } from "../controllers/mentorshipController.js";

const router = express.Router();

// Route to get all unassigned mentees
router.get("/unassigned", getUnassignedMentees);

// Route to assign a mentee to a mentor
router.post("/assign", assignMenteeToMentor);

export default router;
