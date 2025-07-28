const Pizza = require("../models/pizza.model");

// ✅ Get all pizzas with optional filters
exports.getAllPizzas = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;

    const filter = {};

    if (category && typeof category === "string") {
      filter.category = new RegExp(`^${category}$`, "i");
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) {
        const min = Number(minPrice);
        if (isNaN(min) || min < 0) {
          return res.status(400).json({ message: "minPrice must be a valid positive number" });
        }
        filter.price.$gte = min;
      }

      if (maxPrice) {
        const max = Number(maxPrice);
        if (isNaN(max) || max < 0) {
          return res.status(400).json({ message: "maxPrice must be a valid positive number" });
        }
        filter.price.$lte = max;
      }

      if (filter.price.$gte && filter.price.$lte && filter.price.$gte > filter.price.$lte) {
        return res.status(400).json({ message: "minPrice cannot be greater than maxPrice" });
      }
    }

    const pizzas = await Pizza.find(filter);
    res.json(pizzas);
  } catch (err) {
    console.error("GET /pizzas error:", err);
    res.status(500).json({ message: "Failed to load pizzas" });
  }
};

// ✅ Create a new pizza
exports.createPizza = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;

    if (!name || !description || !price || !category || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({ message: "Price must be a positive number" });
    }

    const newPizza = await Pizza.create({
      name: name.trim(),
      description: description.trim(),
      price: numericPrice,
      category: category.trim(),
      imageUrl: imageUrl.trim(),
    });

    res.status(201).json({ message: "Pizza created", pizza: newPizza });
  } catch (err) {
  console.error("CREATE PIZZA ERROR:", err);  // Add this line
  res.status(500).json({ message: "Error creating pizza", error: err.message });
}
};


// ✅ Get a single pizza by ID (NEW METHOD)
exports.getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) return res.status(404).json({ message: "Pizza not found" });
    res.json(pizza);
  } catch (err) {
    res.status(400).json({ message: "Invalid pizza ID" });
  }
};

// ✅ Update a pizza
exports.updatePizza = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;

    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) return res.status(404).json({ message: "Pizza not found" });

    pizza.name = name?.trim() || pizza.name;
    pizza.description = description?.trim() || pizza.description;
    pizza.price = typeof price === "number" ? price : pizza.price;
    pizza.category = category?.trim() || pizza.category;
    pizza.imageUrl = imageUrl?.trim() || pizza.imageUrl;

    await pizza.save();
    res.json({ message: "Pizza updated", pizza });
  } catch (err) {
    res.status(500).json({ message: "Error updating pizza", error: err.message });
  }
};

// ✅ Delete a pizza
exports.deletePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndDelete(req.params.id);
    if (!pizza) return res.status(404).json({ message: "Pizza not found" });
    res.json({ message: "Pizza deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting pizza", error: err.message });
  }
};



