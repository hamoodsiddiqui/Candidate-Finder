// middleware/roleCheck.js

module.exports = (requiredRole) => {
  return (req, res, next) => {
    if (req.session.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }
  };
};
