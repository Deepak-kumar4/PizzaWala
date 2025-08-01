const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    pizza: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      required: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please provide a valid email address"],
      index:true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index:true
    },
    cart: {
      type: [cartItemSchema],
      default: [],
      validate: {
        validator: function (v) {
          return Array.isArray(v);
        },
        message: "Cart must be an array of items",
      },
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1, role: 1 });

module.exports = mongoose.model("User", userSchema);




