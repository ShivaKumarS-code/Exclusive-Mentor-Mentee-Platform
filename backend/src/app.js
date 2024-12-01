import express from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from "./routes/appointmentRoutes.js";
import mentorshipRoutes from "./routes/mentorshipRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Routes
app.get("/", (req, res)=> {
    res.send("MentorMentee Platform API");
})

app.use('/api/auth', authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/yourMentee", mentorshipRoutes);


export { app };