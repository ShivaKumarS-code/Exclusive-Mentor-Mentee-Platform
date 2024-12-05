import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (who is requesting the appointment)
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (who receives the appointment)
      required: true,
    },
    role: {
      type: String,
      enum: ["mentor", "mentee"], // Specifies the role of the user making the request
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
      maxlength: 300, // Optional: Limit the reason's length
    },
    status: {
      type: String,
      enum: ["approving", "approved", "denied"], // Appointment status
      default: "approving",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
