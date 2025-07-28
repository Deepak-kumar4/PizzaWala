const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be a positive number"],
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // This regex allows https URLs ending with common image extensions and optional query params
        return /^https?:\/\/.+\.(png|jpg|jpeg|gif|webp)(\?.*)?$/i.test(v);
      },
      message: "Invalid image URL format",
    },
  },
});

module.exports = mongoose.model("Pizza", pizzaSchema);


