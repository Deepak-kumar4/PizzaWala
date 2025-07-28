const User = require("../models/user.model");

// getCart
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.pizza");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ cart: user.cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// updateCart
exports.updateCart = async (req, res) => {
  const userId = req.user?.id;
  const { cart } = req.body;

  try {
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cart },
      { new: true }
    ).populate("cart.pizza");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ cart: updatedUser.cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ error: "Failed to update cart" });
  }
};
