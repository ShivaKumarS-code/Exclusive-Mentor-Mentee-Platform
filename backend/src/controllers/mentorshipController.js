import User from "../models/User.js";

// Get all unassigned mentees for a specific mentor (Mentees who don't have an assigned mentor)
export const getUnassignedMentees = async (req, res) => {
  try {
    const mentorId = req.user.id; // Assuming you get the mentor's ID from the token (authMiddleware)

    // Find all mentees whose assignedMentor is null (not assigned to any mentor)
    const unassignedMentees = await User.find({
      role: "mentee",
      assignedMentor: null, // Ensure mentees are not yet assigned
    }).select("username email _id"); // Select only necessary fields like username and email

    res.status(200).json({ mentees: unassignedMentees });
  } catch (error) {
    res.status(500).json({ message: "Error fetching unassigned mentees", error });
  }
};


// Assign a mentee to a mentor
export const assignMenteeToMentor = async (req, res) => {
  const { menteeId, mentorId } = req.body;

  try {
    // Check if the mentee already has an assigned mentor
    const mentee = await User.findById(menteeId);
    if (mentee.assignedMentor) {
      return res.status(400).json({ message: "This mentee is already assigned to a mentor." });
    }

    // Check if the mentor exists and is a valid mentor
    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(400).json({ message: "Invalid mentor ID or mentor does not exist." });
    }

    // Assign the mentee to the mentor by updating the mentee's assignedMentor field
    mentee.assignedMentor = mentorId;
    await mentee.save();

    res.status(200).json({ message: "Mentee successfully assigned to mentor", mentee });
  } catch (error) {
    res.status(500).json({ message: "Error assigning mentee to mentor", error });
  }
};

// Get all mentees assigned to a specific mentor (and optionally unassigned ones)
export const getMenteesForMentor = async (req, res) => {
  const { mentorId } = req.params;
  
  try {
    // Find all mentees assigned to the mentor
    const mentees = await User.find({
      role: "mentee",
      assignedMentor: mentorId, // Filter mentees assigned to this mentor
    }).select("username email");

    res.status(200).json({ mentees });
  } catch (error) {
    res.status(500).json({ message: "Error fetching mentees for mentor", error });
  }
};

// Select a mentee for the mentor (assign mentee to the mentor)
export const selectMenteeForMentor = async (req, res) => {
  const { mentorId, menteeId } = req.body;

  try {
    // Check if the mentee is already assigned
    const mentee = await User.findById(menteeId);
    if (mentee.assignedMentor) {
      return res.status(400).json({ message: "This mentee is already assigned to a mentor." });
    }

    // Find the mentor
    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(400).json({ message: "Invalid mentor or mentor does not exist." });
    }

    // Assign the mentee to the mentor
    mentee.assignedMentor = mentorId;
    await mentee.save();

    res.status(200).json({ message: "Mentee successfully assigned to mentor", mentee });
  } catch (error) {
    res.status(500).json({ message: "Error assigning mentee", error });
  }
};

// Unselect a mentee for the mentor (unassign the mentee)
export const unselectMenteeForMentor = async (req, res) => {
  const { mentorId, menteeId } = req.body;

  try {
    const mentee = await User.findById(menteeId);
    if (!mentee || mentee.assignedMentor.toString() !== mentorId) {
      return res.status(400).json({ message: "This mentee is not assigned to this mentor." });
    }

    // Unassign the mentee from the mentor
    mentee.assignedMentor = null;
    await mentee.save();

    res.status(200).json({ message: "Mentee successfully unassigned from mentor" });
  } catch (error) {
    res.status(500).json({ message: "Error unassigning mentee", error });
  }
};
