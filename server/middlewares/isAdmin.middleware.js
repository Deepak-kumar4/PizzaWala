// middlewares/isAdmin.middleware.js

const isAdmin = (req, res, next) => {
  console.log("🔐 Checking admin role:", req.user);

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized. Token missing or invalid." });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};

module.exports = {isAdmin};



