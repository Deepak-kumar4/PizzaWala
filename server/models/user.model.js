const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // product ID from menu, stored as string
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false } // prevent Mongo from adding its own _id to subdocuments
);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: [cartItemSchema],
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);

