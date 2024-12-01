// roleMiddleware.js
export default function roleMiddleware(requiredRole) {
    return (req, res, next) => {
      try {
        const { role } = req.user; // Assumes `authMiddleware` has already added the `user` object to `req`
        
        if (!role) {
          return res.status(403).json({ message: "User role is not defined" });
        }
  
        if (role !== requiredRole) {
          return res
            .status(403)
            .json({ message: `Access denied: Requires ${requiredRole} role` });
        }
  
        next(); // Proceed to the next middleware or route handler
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      }
    };
  }
  