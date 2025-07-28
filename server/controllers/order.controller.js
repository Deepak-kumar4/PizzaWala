const mongoose = require("mongoose");
const Order = require("../models/order.model");
const Pizza = require("../models/pizza.model");
const User = require("../models/user.model");

// Create a new order before payment
exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice, razorpay_order_id } = req.body;
    const fromUserId = req.user.id;

    if (!fromUserId || !items || !Array.isArray(items) || items.length === 0 || !totalPrice) {
      return res.status(400).json({ message: "Missing or invalid order data" });
    }

    const orderItems = [];
    let adminUser = await User.findOne({ role: "admin" });
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
    }

    const newOrder = await Order.create({
      fromUserId,
      toUserId: adminUser._id,
      items: orderItems,
      totalPrice,
      razorpay_order_id,
      status: "Pending",
    });

    // ✅ After creating the order, fetch all user's orders
    const userOrders = await Order.find({ fromUserId }).sort({ createdAt: -1 });

    res.status(201).json({
      message: "Order created successfully",
      newOrder,
      allOrders: userOrders,
    });
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
  const { id } = req.params;
  const { status } = req.body;

  if (!["Pending", "Accepted", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  const order = await Order.findById(id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = status;
  await order.save();

  res.json({ message: "Order status updated", order });
};


// Admin get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("fromUserId", "name email")
      .populate("items.pizzaId", "name image price");

    const formattedOrders = orders.map((order) => ({
      _id: order._id,
      user: order.fromUserId,
      status: order.status,
      total: order.totalPrice,
      items: order.items.map((item) => ({
        pizza: item.pizzaId,
        quantity: item.quantity,
      })),
    }));

    res.status(200).json({ orders: formattedOrders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

exports.getOrdersForAdmin = async (req, res) => {
  try {
    const adminId = req.user.id;

    // Step 1: Find all pizza IDs created by this admin
    const pizzas = await Pizza.find({ createdBy: adminId }).select("_id");
    const pizzaIds = pizzas.map(p => p._id);

    // Step 2: Find orders containing those pizzas
    const orders = await Order.find({ "items.pizza": { $in: pizzaIds } })
      .populate("user", "email")
      .populate("items.pizza", "name price");

    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch admin's orders." });
  }
};




