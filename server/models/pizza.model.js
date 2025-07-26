const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"Pizza name is required"],
    trim:true,
    minLength:[2,"Pizza name must be atleast 2 characters"],
    maxLength:[50,"Pizza name cannot exceed 50 characters"],
    index:true,
  },
  description:{
    type:String,
    required:[true,"Description is Required"],
    trim: true,
    minLength:[5,"Description length must be of 5 characters"],
    maxLength:[300,"Description can't exceed 300 characters"],
  },

  imageUrl: {
    type: String,
    required: true,
     validate: {
      validator: (v) => /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v),
      message: "Invalid image URL format",
    },
    default:
      "https://content.jdmagicbox.com/v2/comp/delhi/b4/011pxx11.xx11.230122061405.c9b4/catalogue/nomad-pizza-traveller-series-noida-sector-141-delhi-pizza-outlets-kcrq0ae75j.jpg",
  },
  price: {
    type: Number,
    required: true,
    min:0,
    max: 10000,
    index:true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: {
      values: ["Veg", "Non-Veg"],
      message: "Category must be either 'Veg' or 'Non-Veg'",
    },
    set: (v) => {
      const formatted = v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
      return formatted === "Non-veg" ? "Non-Veg" : formatted;
    },
    index:true,
  },
},{
  timestamps:true,
});

pizzaSchema.index({ category: 1, price: 1 });

module.exports = mongoose.model("Pizza", pizzaSchema);

