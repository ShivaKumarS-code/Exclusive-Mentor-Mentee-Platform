import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = { id: user._id, role: user.role }; // Add user details to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};
