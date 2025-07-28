const Pizza = require("../models/pizza.model");

// Get full menu (all pizzas)
exports.getMenu = async (req, res) => {
  try {
    // get all the pizza 
    const pizzas = await Pizza.find();
    // checking number of pizzas 
    if(!pizzas || pizzas.length ===0){
        return res.status(404).json({message:"No pizza found in the menu"});
    }
    res.status(200).json(pizzas);
  } catch (err) {
    console.error("GET /menu error:", err);
    res.status(500).json({ message: "Error fetching menu", error: err.message });
  }
};

exports.getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) return res.status(404).json({ message: "Pizza not found" });
    res.json(pizza);
  } catch (err) {
    res.status(500).json({ message: "Error fetching pizza details" });
  }
};
