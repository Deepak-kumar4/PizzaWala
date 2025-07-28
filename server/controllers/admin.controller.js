const User = require("../models/user.model");
const Pizza = require("../models/pizza.model");
const Order = require("../models/order.model");

// ✅ Get all users (excluding passwords)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// ✅ Get pizza by ID
const getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) return res.status(404).json({ error: "Pizza not found" });
    res.json(pizza);
  } catch (err) {
    res.status(400).json({ error: "Invalid pizza ID" });
  }
};

// ✅ Update pizza by ID
const updatePizza = async (req, res) => {
  try {
    const updated = await Pizza.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Pizza not found" });
    res.json(updated);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Failed to update pizza" });
  }
};

// ✅ Delete pizza by ID
const deletePizza = async (req, res) => {
  try {
    const deleted = await Pizza.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Pizza not found" });
    }
    res.json({ message: "Pizza deleted successfully", deleted });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "Failed to delete pizza" });
  }
};

// ✅ Admin Dashboard Stats
const getAdminStats = async (req, res) => {
  try {
    const pizzasCount = await Pizza.countDocuments();
    const ordersCount = await Order.countDocuments();
    const usersCount = await User.countDocuments();

    res.status(200).json({
      pizzas: pizzasCount,
      orders: ordersCount,
      users: usersCount,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

// ✅ Promote or Demote User Role
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User role updated successfully", user });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Failed to update user role" });
  }
};

// ✅ Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully", user });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

const getAllAdminPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.status(200).json({ pizzas });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pizzas" });
  }
};

module.exports = {
  getAllUsers,
  updatePizza,
  deletePizza,
  getPizzaById,
  getAdminStats,
  updateUserRole,
  deleteUser,
  getAllAdminPizzas,
};





