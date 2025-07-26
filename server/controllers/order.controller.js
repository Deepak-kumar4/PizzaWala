const mongoose = require("mongoose");
const Order = require("../models/order.model");
const Pizza = require("../models/pizza.model");
const User = require("../models/user.model");

// Create a new order before payment
exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice, razorpay_order_id } = req.body;
    const fromUserId = req.user.id;

    // Validation*
    if (!fromUserId || !items || !Array.isArray(items) || items.length === 0 || !totalPrice) {
      return res.status(400).json({ message: "Missing or invalid order data" });
    }

    const orderItems = [];
    let adminUser = await User.findOne({ role: "admin" }); // default admin
    if (!adminUser) return res.status(500).json({ message: "No admin found" });

    for (const item of items) {
      const { pizzaId, quantity } = item;

      if (!pizzaId || !quantity || quantity <= 0) {
        return res.status(400).json({ message: "Invalid item data" });
      }

      const pizza = await Pizza.findById(pizzaId);
      if (!pizza) {
        return res.status(404).json({ message: `Pizza not found for ID: ${pizzaId}` });
      }

      orderItems.push({
        pizzaId: pizza._id,
        name: pizza.name,
        price: pizza.price,
        quantity,
      });

      // If you later add `pizza.createdBy`, you can use that instead of this static admin
      // const adminUser = await User.findById(pizza.createdBy);
    }

    const newOrder = await Order.create({
      fromUserId,
      toUserId: adminUser._id,
      items: orderItems,
      totalPrice,
      razorpay_order_id,
      status: "Pending",
    });

    res.status(201).json({ message: "Order created", order: newOrder });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: "Server error while creating order" });
  }
};

// Get all orders for the logged-in user
exports.getUserOrders = async (req, res) => {
  try {
    const fromUserId = req.user.id;

    const orders = await Order.find({ fromUserId }).sort({ createdAt: -1 });

    res.json({ orders });
  } catch (err) {
    console.error("Fetching user orders failed:", err);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};

// Admin update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID format" });
    }

    const allowedStatus = ["Pending", "Paid", "Delivered"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated", order: updatedOrder });
  } catch (err) {
    console.error("Order status update error:", err);
    res.status(500).json({ message: "Server error while updating order" });
  }
};


