// middlewares/error.middleware.js
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
};

module.exports = errorHandler;
