const User = require("../models/user.model");

// Get current user's cart
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ cart: user.cart || [] });
  } catch (err) {
    console.error("GET /cart error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user's cart
exports.updateCart = async (req, res) => {
  try {
    const { cart } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { cart },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Cart updated" });
  } catch (err) {
    console.error("PUT /cart error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
